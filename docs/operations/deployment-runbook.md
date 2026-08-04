# Shared Blood, Deployment Runbook

**Audience: the project owner.** Every step below requires account access that only you have. Work through them in order; each one ends with a check you can run yourself.

Nothing here has been performed automatically. The repository is committed locally and fully verified, but it has never been pushed, and no hosting account has been touched.

**Current state**

| | |
|---|---|
| Branch | `main` |
| Commits | working tree clean; run `git log --oneline \| wc -l` for the current count |
| Tracked files | 525 (`git ls-files \| wc -l`) |
| Remote | none configured |
| Deployment | none |
| Gates | TypeScript clean, ESLint 0/0, 614 tests / 53 files, build 91/91 |

---

## Step 1. Create the GitHub repository

1. Create a **new empty repository** (no README, no .gitignore, no licence, or the first push will conflict).
2. Decide public or private. This affects one security control:
   - **Public**: CodeQL and secret scanning are free and work immediately.
   - **Private**: CodeQL requires GitHub Advanced Security. If you do not have it, record `CODEQL_UNAVAILABLE_UNDER_CURRENT_PLAN`; the ESLint-based SAST controls from Module 25.8 still apply.
3. **Before pushing**, enable these under Settings → Code security:
   - Secret scanning
   - **Push protection** (this is the one that matters: it blocks a secret at push time rather than telling you afterwards)
   - Dependency graph and Dependabot alerts

Then connect and push:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

**Check:** compare GitHub against your local repository rather than against a number written here, since the number moves every time a commit lands:

```bash
git ls-files | wc -l && git rev-list --count HEAD
```

GitHub's file and commit counts must match those two figures exactly. Then confirm `.env.local`, `node_modules/` and `.next/` are **absent** from the file list. If any appear, stop and tell me.

## Step 2. Protect the branch

Settings → Branches → add a rule for `main`:

- Require a pull request before merging
- Require status checks to pass, selecting **`Quality gates (Node 22)`** and **`Quality gates (Node 24)`**
- Do not allow force pushes
- Do not allow deletions

**Check:** `git push --force origin main` is rejected.

## Step 3. Confirm account security

These cannot be verified from the code and are the largest residual risk in the whole project. Confirm each:

- [ ] MFA enabled on GitHub
- [ ] MFA enabled on the hosting account
- [ ] MFA enabled at the domain registrar
- [ ] Recovery codes stored **outside** this repository
- [ ] Collaborators reviewed; no unknown deploy keys or repository apps

## Step 4. Wait for CI

The first push triggers `.github/workflows/ci.yml`. It runs a clean install, typecheck, lint, tests, the em-dash check, a production build, a production dependency audit, and two regression guards, on Node 22 and 24.

**Check:** both matrix jobs are green. **Do not deploy from a red commit.**

Expect the full `npm audit` step to report 9 advisories. That is expected and does not block: it is informational, and every one of those advisories was assessed as unreachable in the Module 25.8 report, §10.

## Step 5. Connect Vercel

1. Import the GitHub repository. Vercel auto-detects Next.js; **accept the defaults**.
2. Set the Node version to **22.x** (matching `.nvmrc`).
3. **Do not add a `vercel.json`.** Security headers come from `next.config.mjs`, and a `vercel.json` `headers` block would override them.
4. Under Settings → Git, enable "Only build if CI passes" if available.

**Environment variables.** Add exactly one, for all environments:

```
NEXT_PUBLIC_SITE_URL = https://your-final-domain
```

Note this carefully: for the **preview** environment you may temporarily set the preview origin, but the **production** value must be the final canonical HTTPS domain with no trailing slash. Add nothing else. The site requires no secret (`NO_REQUIRED_RUNTIME_SECRET`), so if you find yourself adding a second variable, something has changed and it needs review.

**Check:** the build log shows a clean install, Node 22, and 91/91 static pages, with no secret values and no local filesystem paths.

## Step 6. Verify the preview deployment

Do this **before** attaching the domain, and do not circulate the preview URL.

```bash
curl -sSI https://<preview-url>/en | grep -iE 'content-security-policy|strict-transport|x-frame-options|x-content-type|referrer-policy|permissions-policy|x-powered-by'
```

Expect all six security headers present and **no** `x-powered-by`.

Then confirm Vercel has not altered the policy: the CSP must still read `frame-ancestors 'none'` and must **not** contain `unsafe-eval`.

## Step 7. Attach the domain and verify HTTPS

1. Add the domain in Vercel and create the DNS records it specifies.
2. Choose the canonical hostname (root or `www`) and redirect the other to it.
3. Wait for the certificate to issue.

**Do not touch MX, SPF, DKIM or DMARC records.** Removing them silently breaks email for the project address.

```bash
curl -sSI http://your-domain | grep -i location          # expect an https:// redirect
curl -sSI https://your-domain/en | grep -i strict-transport
curl -s https://your-domain/sitemap.xml | head -20
curl -s https://your-domain/robots.txt
```

**Check:** valid certificate with no browser warning, HTTP redirects to HTTPS, HSTS present on the HTTPS response, and the sitemap shows your real domain rather than `localhost` or `*.vercel.app`.

## Step 8. Confirm the canonical origin took effect

This is the one item Module 26 §45 requires be closed during deployment.

```bash
curl -s https://your-domain/en | grep -o '<link rel="canonical"[^>]*>'
curl -s https://your-domain/en | grep -cE 'localhost:3000|127\.0\.0\.1|vercel\.app'
```

Expect the canonical to be `https://your-domain/en` and the second command to print `0`.

If it still shows a preview or localhost origin, `NEXT_PUBLIC_SITE_URL` is wrong for the production environment. Fix it and **redeploy**; changing an environment variable alone does not rebuild the static pages.

## Step 9. Post-deployment smoke test

Run [`scripts/verify-deployment.mjs`](../../scripts/verify-deployment.mjs) against the live site:

```bash
node scripts/verify-deployment.mjs https://your-domain
```

It repeats the full local verification suite against production: security headers on both locales, CSP directives, XSS and redirect payloads, HTTP methods, disclosure paths, preview-route blocking, Family Tree, canonical origins and cache behaviour. It exits non-zero on any failure.

Then check by hand what a script cannot:

- All five genetics tools load and respond to their controls, in English and Urdu
- Language switching works in both directions with no manual reload
- Mobile navigation opens, expands, and closes on Escape
- The Evidence Map renders and is not mirrored in Urdu
- Browser console is clean

## Step 10. Tag the release

Only after step 9 passes:

```bash
git tag -a v1.0.0 -m "Shared Blood v1.0.0"
git push origin v1.0.0
```

## Step 11. Launch decision

Public launch is an explicit decision, not an automatic consequence of a green deploy. Confirm: no open S0/S1/S2, rollback available, monitoring on, security contact published. Then announce.

---

## Rollback

| | |
|---|---|
| **How** | Vercel → Deployments → select the last known-good deployment → **Promote to Production**. Takes under a minute and needs no rebuild. |
| **Alternative** | `git revert <bad-commit> && git push`, which triggers a fresh verified build. Slower but leaves a clean history. |
| **Who** | The project owner. |
| **Recovery time** | Under 5 minutes via promotion. |

**Roll back immediately, without debating it first, if any of these appear:** incorrect genetics or inheritance results; missing or broken disease pages; broken Urdu or RTL rendering; CSP breakage or a flood of violations; any sign of content tampering; severe rendering failure; outage; or a newly discovered S0/S1.

Genetics correctness is the one that matters most. A wrong probability on this site can influence a real family's decision, so the bar for rolling back is low.

**After rolling back:** confirm the homepage in both locales, one disease page, the Inheritance Calculator, security headers, and HTTPS. Then record what happened before attempting a fix.

## Backup and recovery

- The Git repository holds **all** production content. No content exists only on the hosting provider.
- `public/media/sample-story.wav` is the only binary asset, and it is in the repository.
- Domain ownership records and recovery codes are stored **outside** the repository, by the owner.
- `v1.0.0` becomes the known-good restore point once tagged.
