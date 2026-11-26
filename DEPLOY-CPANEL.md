# Deploy Enterprise Mate to cPanel (static)

This site is a **static** Vite + React build. The server does **not** need Node.js or PHP — only Apache (typical cPanel) to serve files from `public_html`.

## Why `base: './'`

`vite.config.ts` sets `base: './'` so CSS/JS/image URLs in `dist/` are **relative**. That means the same build works when you upload to:

- domain root → `public_html/`
- a subdomain folder → e.g. `public_html/` for `www` or a subdomain docroot
- a subfolder → e.g. `public_html/marketing/`

If you only ever host at the **apex domain root** and prefer absolute paths, you could change `base` to `'/'` and rebuild — but `./` is the better default for typical cPanel uploads.

## Build (on your PC or CI)

```bash
npm install
npm run build
```

Output is in **`dist/`**.

On Windows you can run:

```powershell
.\deploy-prep.ps1
```

## Upload to cPanel

1. Log into cPanel → **File Manager** (or use FTP/SFTP).
2. Open the site docroot — usually **`public_html`** (or the subdomain’s folder).
3. Upload the **contents** of `dist/` (not the `dist` folder itself):
   - `index.html`
   - `.htaccess`
   - `assets/` (hashed JS/CSS + images)
   - `favicon.svg`
4. Visit the site URL and hard-refresh if you see an old cache.

Alternatively, unzip **`enterprise-mate-dist-for-cpanel.zip`** directly into `public_html` (or the subdomain folder).

## Notes

- **WhatsApp / mailto / tel links** are static `https://wa.me/…`, `mailto:`, and `tel:` URLs in the built HTML/JS — no backend.
- **No PHP** and no server-side env vars are required.
- `.htaccess` rewrites unknown paths to `index.html` (SPA-style). The marketing page uses in-page `#` anchors, so most traffic hits `/` only.
- After changing brand copy or assets, rebuild and re-upload the new `dist/` contents (replace old hashed files under `assets/`).
