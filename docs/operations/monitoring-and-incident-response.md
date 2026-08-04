# Shared Blood, Monitoring and Incident Response

Covers Module 26 §37 (monitoring) and §38 (security contact and incident process). The rollback procedure lives in the [deployment runbook](./deployment-runbook.md).

---

## 1. What to monitor

Shared Blood has no users to profile, no accounts to protect and no data to lose. Monitoring exists for two purposes only: **is the site up and correct**, and **has anything changed that should not have**.

| Signal | Why | Where |
|---|---|---|
| Site availability | A public-health resource being down is the most visible failure | Uptime check on `/en` and `/ur`, 5 minute interval |
| Certificate expiry and DNS resolution | Silent, scheduled, and fatal when missed | Registrar and hosting alerts, plus an expiry reminder |
| Deployment failures | A failed deploy means the live site is not the reviewed commit | Hosting notifications |
| Client runtime errors | Catches hydration and rendering faults real browsers hit and CI does not | Aggregate counts only, see the privacy rule below |
| CSP violation reports | The earliest signal of injected or unexpected script | `report-to` endpoint, optional; see §4 |
| Failed asset loads | A missing font or audio file degrades the site quietly | Hosting analytics |
| Unusual request volume | Scraping or abuse | Hosting analytics |
| Dependency advisories | New CVEs against shipped packages | Dependabot alerts |
| Secret-scanning alerts | A credential committed by mistake | GitHub secret scanning + push protection |
| Unauthorised repository or deployment changes | The realistic route to content tampering | GitHub audit log, hosting deployment log |

### Prohibited, without exception

This is a project constraint, not a preference. Do **not** collect:

- Calculator outcomes or probabilities
- Genotype, carrier status or parent selections
- Relationship results
- Disease-interest profiles
- User-level genetics journeys
- Patient-audio listening profiles

The rule behind all six: **a visitor's interest in a specific genetic condition is sensitive health information.** Someone exploring beta-thalassemia inheritance may be making a reproductive decision, and that is not ours to record, aggregate or infer.

Practically, this means any analytics tool must be configured to record **page-level counts only**, never query strings, since `?disease=` is exactly the parameter that would turn a page view into a health-interest record.

## 2. Choosing an analytics or error tool

None is installed today, and the site is fully functional without one. If you add one:

1. It becomes a **new CSP origin** and a new trust boundary. Both `next.config.mjs` and `docs/security/shared-blood-threat-model.md` must be updated.
2. Prefer a provider that does not set cookies and does not fingerprint.
3. Strip query strings at the collector, not in the browser.
4. Re-run `scripts/verify-deployment.mjs`; the CSP assertions will fail until the new origin is added deliberately, which is the intended behaviour.

## 3. Security contact and responsibilities

| Role | Holder |
|---|---|
| Security contact address | **To be published before launch.** A monitored address, distinct from the general contact form |
| Repository owner | Project owner |
| Hosting account owner | Project owner |
| DNS and registrar control | Project owner |
| Deployment approval | Project owner |

Publish the security contact somewhere a researcher will actually look: the `/contact` page, and optionally a `/.well-known/security.txt`. A reporter who cannot find an address will either post publicly or give up, and both outcomes are worse than an email.

## 4. Optional: CSP violation reporting

The current policy enforces without reporting. To collect violations, add a `report-to` directive and an endpoint. Treat the reports as **noisy by default**: browser extensions generate a large share of violations on any public site, so investigate patterns rather than individual reports.

## 5. Incident response

### 5.1 Severity

| Level | Meaning | Response |
|---|---|---|
| **Critical** | Content tampering, incorrect genetics results, domain or account compromise, exposed credential | Roll back immediately, then investigate |
| **High** | Site down, TLS failure, CSP broken, a genetics tool failing | Roll back if a recent deploy caused it, otherwise fix forward |
| **Medium** | A page broken, Urdu rendering fault, failed assets | Fix forward through the normal CI path |
| **Low** | Cosmetic, or a new advisory in a dependency that is not reachable | Schedule normally |

### 5.2 First actions, in order

1. **Contain.** Roll back to the last known-good deployment. Do not debug in production.
2. **Preserve.** Capture the deployment id, commit hash, timestamp and any logs before changing anything.
3. **Assess.** Was content altered? Was a credential exposed? Is the domain still ours?
4. **Communicate.** If wrong medical or genetics information was publicly visible, say so plainly once corrected. This site's value rests on being trustworthy about inheritance, and quietly fixing a wrong probability would be the worse failure.
5. **Remediate**, then **record** what happened and what changed as a result.

### 5.3 Content tampering

Every piece of content is version-controlled, so tampering is detectable: `git diff` the deployed commit against the tag. If content differs from the repository, the hosting account is compromised, not the code. Rotate hosting credentials, revoke deploy tokens, redeploy from a verified commit.

### 5.4 Domain or DNS compromise

Contact the registrar immediately, confirm the transfer lock, restore correct records, and re-verify `MX`, `SPF`, `DKIM` and `DMARC`, which are the records most often destroyed as collateral damage.

### 5.5 Credential exposure

Assume any credential that reached a public repository is compromised the moment it was pushed. Rotate first, investigate second. Deleting the commit does not un-expose it.

There is currently **nothing to rotate**: the project requires no runtime secret, and the only environment variable in use is a public URL.

### 5.6 Dependency vulnerability

Assess reachability before acting, using the method in the Module 25.8 report §10: does the vulnerable code path ship to production, and can an attacker reach it? Patch within the existing semver range where possible. Never run `npm audit fix --force` to clear an alert.

## 6. Routine review

| Cadence | Action |
|---|---|
| Weekly | Review Dependabot pull requests |
| Monthly | Confirm certificate validity and uptime; skim deployment history for anything unexpected |
| Quarterly | Re-run `scripts/verify-deployment.mjs` against production; confirm MFA still enabled on all three accounts |
| On any feature that adds a form, API, database, analytics or accounts | Revise the threat model **before** the feature ships |
