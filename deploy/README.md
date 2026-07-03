# Deployment

Nectar Haven deploys automatically to the Hostinger VPS (Apache2) whenever a PR
is merged into `main`. GitHub Actions builds the static site and rsyncs it to the
VPS document root; Apache serves it over HTTPS (Let's Encrypt).

```
PR merged to main
   └─> GitHub Actions (.github/workflows/deploy.yml)
         npm ci → npm run lint → npm run build → dist/
              └─> rsync over SSH ──> VPS:/var/www/nectarhaven/
                                        └─> Apache VirtualHost + Let's Encrypt SSL
```

## Files

| File | Purpose |
|---|---|
| `../.github/workflows/deploy.yml` | CI pipeline: build + rsync deploy on push to `main` |
| `nectarhaven.conf` | Apache VirtualHost (HTTP; certbot adds HTTPS) |
| `vps-setup.sh` | One-time VPS provisioning script |

## First-time setup

### 1. Generate a deploy keypair (on your laptop)

```bash
ssh-keygen -t ed25519 -C "github-actions-nectarhaven" -f nectarhaven_deploy
```

- `nectarhaven_deploy.pub` (public) → goes on the VPS (step 2 prompts for it)
- `nectarhaven_deploy` (private) → goes in GitHub secret `VPS_SSH_KEY`

Use a **dedicated key for this site** (matching per-site isolation) so it can be
revoked independently of your other sites.

### 2. Provision the VPS

Copy `vps-setup.sh` and `nectarhaven.conf` to the VPS, then:

```bash
chmod +x vps-setup.sh
./vps-setup.sh
```

It creates the `nectarhaven` user + document root, installs the public key and
VirtualHost, and prints the remaining DNS / SSL / secrets steps.

### 3. DNS + SSL

- Point `nectarhavenfeeders.com` and `www` A records at the VPS IP.
  ⚠️ This is a cutover off the current Hostinger shared hosting — consider testing
  on a staging subdomain first.
- After DNS resolves to the VPS: `sudo certbot --apache -d nectarhavenfeeders.com -d www.nectarhavenfeeders.com`

### 4. GitHub secrets

Repo → **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `VPS_HOST` | VPS IP address |
| `VPS_USER` | `nectarhaven` |
| `VPS_SSH_KEY` | contents of the private key `nectarhaven_deploy` |

### 5. Verify

Test the pipeline manually before relying on CI:

```bash
npm run build
rsync -avz ./dist/ nectarhaven@<VPS_IP>:/var/www/nectarhaven/
```

Then merge a trivial PR to `main` and watch the **Actions** tab. Confirm the site
loads over HTTPS and the other VirtualHosts still work (`sudo apache2ctl configtest`).
