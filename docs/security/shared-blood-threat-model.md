# Shared Blood, Threat Model

Created under Module 25.8 §5. This is a living document: it describes what is worth protecting, who would plausibly attack it, where trust changes hands, and what the worst realistic outcomes are. It is written for the project owner as much as for engineers, so the reasoning is stated in plain language.

Review this document whenever a module adds a form, an API route, a server action, an analytics provider, a third-party script, a database, or user accounts. Every one of those changes a trust boundary.

## 1. What Shared Blood actually is, in security terms

Shared Blood is a **read-only, statically prerendered, bilingual educational website**. That single sentence removes most of the OWASP Top 10 from the picture, and it is the most important fact in this document.

Concretely, as verified in Module 25.8:

- No user accounts, no authentication, no sessions, no authorization logic.
- No database, no persistence layer, no user-generated content.
- No API routes, no route handlers, no server actions, no form submissions.
- No payment processing and no patient records.
- No third-party scripts, analytics, pixels, embeds or iframes.
- No outbound network requests from application code; every dataset is compiled into the bundle at build time.
- No browser storage: no `localStorage`, no `sessionStorage`, no `indexedDB`, no `document.cookie` writes. The only cookie is `NEXT_LOCALE`, set by the internationalization middleware to remember language choice.
- No runtime secret is required to serve the site (`NO_REQUIRED_RUNTIME_SECRET`).

The consequence is that the classic web attack surface, injection into a datastore, broken access control, session hijacking, insecure deserialization, is largely **absent rather than defended**. Absence is a stronger guarantee than defence, but it is fragile: it holds only while these properties hold. `src/audit/security.test.ts` exists specifically to fail loudly if a future module quietly reintroduces one of them.

## 2. Assets

Ranked by how much damage their compromise would cause.

| Asset | Why it matters | Where it lives |
|---|---|---|
| **Medical and genetics content** | Wrong inheritance information could influence a real family's reproductive decisions. This is the asset with genuine human consequences. | Version-controlled TypeScript data under `src/features/*/data/` |
| **Calculator integrity** | The canonical inheritance engine produces the probabilities users act on. Silent tampering would be hard for a visitor to detect. | `src/features/genetics/calculator/engine.ts` |
| **Deployment credentials and hosting account** | Compromise allows arbitrary content replacement, which is the realistic route to the two assets above. | Hosting provider, outside the repository |
| **Domain and DNS control** | Compromise allows full impersonation of the project, including certificate issuance. | Registrar, outside the repository |
| **Source code and build pipeline** | The supply chain into everything published. | Local working tree; no remote repository configured yet |
| **Evidence Map records** | Geographic and prevalence claims presented as evidence-backed. | `src/features/genetics/pakistan-map/data/` |
| **Audio assets and patient stories** | Real people's voices; a privacy asset, not just an integrity one. | `public/media/`; production story records are intentionally empty |
| **Localization files** | Urdu copy is trusted content rendered to users; a malicious translation is a content-integrity issue. | `messages/en.json`, `messages/ur.json` |
| **Website availability** | An outage removes a public-health resource. | Hosting provider |
| **Public project email** | Impersonation and phishing surface. | External provider |

## 3. Attackers

| Actor | Motivation | Realistic capability against Shared Blood |
|---|---|---|
| **Opportunistic scanners and bots** | Automated, indiscriminate | Probe for exposed `.env`, `.git`, admin panels, known CVEs. High volume, low sophistication. **This is by far the most likely traffic to actually arrive.** |
| **Vandals** | Defacement, attention | Would need deployment or repository access; no in-application write path exists |
| **Secret hunters** | Harvest credentials from public repositories and bundles | Automated scanning of any published repository and of served JavaScript |
| **Supply-chain attackers** | Compromise many downstream sites at once | Publish a malicious or typosquatted npm package, or compromise an existing maintainer account |
| **Medical-misinformation actors** | Alter genetics or disease guidance | Would require content-write access; the plausible route is a compromised deployment account, not the web tier |
| **Domain and account attackers** | Hijack the project's identity | Credential stuffing, phishing, registrar social engineering, or missing MFA |

Deliberately out of scope: nation-state adversaries, physical access to the owner's machine, and attacks on third-party hospitals or reference sources (which Module 25.8 §4 forbids testing).

## 4. Trust boundaries

```
  Visitor's browser
        │   (1) untrusted input: URL path, query string, headers, HTTP method
        ▼
  Hosting edge / CDN
        │   (2) cache: a poisoned or over-long-lived entry is served to everyone
        ▼
  Next.js middleware  ── locale detection, method filter
        │   (3) request rewriting; locale cookie
        ▼
  React Server Components (prerendered at build time)
        │   (4) content compiled in at BUILD time, not fetched at request time
        ▼
  Static HTML + RSC payload  ──► browser  ── (5) CSP is the last line of defence
```

Boundary by boundary:

1. **Browser to website.** The only untrusted inputs are the URL path, the query string, request headers and the HTTP method. Every path segment that selects content (locale, disease slug, tool slug, resource slug) is checked against a closed allowlist and fails to a 404. Query parameters are either ignored or rendered as escaped React text.
2. **Website to shared cache.** Responses are public and identical for all visitors, so there is nothing user-specific to leak. The risk here is *cache pollution* rather than cache *disclosure*: Module 25.8 found and fixed a case where a not-found response was being stored under a one-year TTL at an attacker-chosen URL.
3. **Middleware.** Runs before every page. It sets the locale cookie and now rejects mutation verbs. A defect here affects every route at once, so changes to `src/middleware.ts` deserve disproportionate review.
4. **Build time versus request time.** This is the most security-relevant boundary in the whole project. Content is baked in at build time from version-controlled files, so there is no request-time content source an attacker can influence. Introducing a runtime content fetch would move Shared Blood into a completely different risk class.
5. **Local environment to deployment.** Currently the widest boundary, because it is entirely procedural. There is no remote repository or CI/CD yet, so "who can publish" is answered by "whoever can reach the hosting account". Module 26 must close this with MFA, branch protection and least-privilege deploy tokens.

## 5. Highest-impact failures

Ordered by expected impact, with the honest current assessment.

| # | Failure | Impact | Likelihood today | Why |
|---|---|---|---|---|
| 1 | **Altered medical or genetics content** | Severe, real-world harm | Low | Requires deployment or repository compromise. No web-tier write path exists. |
| 2 | **Calculator returns wrong results through code tampering** | Severe | Low | Same access requirement, plus the canonical engine is covered by tests that run in the release gate. |
| 3 | **Deployment or domain account compromise** | Severe | **Moderate** | Depends entirely on MFA and credential hygiene, which are outside the code and currently unverified. **This is the project's single largest residual risk.** |
| 4 | **Compromised dependency** | Severe | Low to moderate | 7 runtime dependencies, all mainstream. Lockfile committed. Ongoing advisory monitoring required. |
| 5 | **Malicious script execution (XSS)** | High | Very low | No HTML injection sink exists anywhere in the codebase; CSP blocks plugins, base-tag hijacking and framing. |
| 6 | **Credential exposure** | High | Very low | No secret is required to run the site; the only environment variable in use is a public URL. |
| 7 | **Malicious redirect** | Moderate | Very low | No user-controlled value reaches a navigation target; verified empirically against protocol-relative and `javascript:` payloads. |
| 8 | **Persistent outage** | Moderate | Low | Static hosting; no origin database or compute to exhaust. |
| 9 | **Future sensitive-form data leakage** | High **if it happens** | Not applicable today | No form posts anywhere. This becomes the top risk the moment a contact or survey form is added. |

## 6. Standing rules this model depends on

These are project constraints, not general advice. Breaking one invalidates part of this model.

- Genetics results stay **transient**: never persisted, never placed in a URL, never sent to analytics.
- Only the disease identifier may travel between tools, via an explicit allowlist. Genotype, carrier status, probability and relationship results never do.
- No compatibility, marriage-safety or individual-risk scoring.
- One canonical inheritance engine; the Punnett square is a renderer only.
- No genetic test reports, DNA/VCF files, CNIC or B-Form identifiers are ever collected.
- Family Tree remains retired.
- The service-role key, if Supabase is ever adopted, is server-only and never carries a `NEXT_PUBLIC_` prefix.

## 7. What would change this model

Add any of the following and this document must be revised before the feature ships:

- A form that submits data, which introduces CSRF, validation, spam and data-retention concerns.
- An API route or server action, which introduces authorization and rate-limiting concerns.
- A database or CMS, which introduces injection and access-control concerns.
- Analytics or any third-party script, which introduces a data-sharing boundary and requires new CSP origins.
- User accounts, which introduce the entire authentication and session attack surface.
- Runtime content fetching, which moves content trust from build time to request time.
- File uploads, which introduce malware, storage abuse and content-type confusion.
