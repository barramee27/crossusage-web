# CrossUsage marketing site (`crossusage.dev`)

Fork of **[robinebers/openusage-web](https://github.com/robinebers/openusage-web)** (Robin’s OpenUsage landing page), retuned for **CrossUsage**:

- Branding, metadata, and GitHub links point at **[barramee27/crossusage](https://github.com/barramee27/crossusage)**.
- Hero and download CTAs emphasize **Linux & Windows** builds; **macOS** links to upstream **OpenUsage** releases.
- Footer and open-source section credit **OpenUsage** and **Robin Ebers**.
- **Static export** (`output: "export"`) so `out/` can be served by **nginx** (no Node on the VPS).
- **Vercel Analytics** removed; `track()` is a no-op (self-hosted).

## Develop

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Upload the **`out/`** directory to the server (see `deploy/crossusage.dev/` in the main CrossUsage repo). The export uses **`trailingSlash: true`** so routes are `out/download/index.html`, etc., which matches typical nginx `try_files` rules.

**Routes:** `/` (home), `/download/`, `/privacy/`, `/credits/`. Shared header and footer live in `components/site-header.tsx` and `components/site-footer.tsx`.

Hero imagery: `public/hero-crossusage.png` is used for the landing visual and social cards; replace it with a higher-resolution capture if you want a sharper hero or OG preview.

## Git remote

This directory was cloned from upstream. Point `origin` at your own repo when you publish the fork:

```bash
git remote rename origin upstream
git remote add origin git@github.com:YOUR_USER/crossusage-web.git
```

## GitHub Actions

Workflow: `.github/workflows/deploy.yml`. Set repository variable **`ENABLE_VPS_DEPLOY=true`** and secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH` (e.g. `/var/www/crossusage.dev/html`), `DEPLOY_SSH_KEY`. Optional: `DEPLOY_PORT`, `DEPLOY_RELOAD_CMD` (e.g. `sudo /usr/local/sbin/crossusage-nginx-reload`).
