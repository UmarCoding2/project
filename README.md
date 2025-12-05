# Project — Umar Spotify (Static)

This repository is a static front-end site for playing audio files from the `songs1/` folder. It includes a small demo signup/login UI (client-side demo auth), dynamic cards per-folder, and manifest-based song discovery for static hosting (Vercel).

## Prerequisites

- Node.js (for manifest generation)
- Git (for committing and pushing to GitHub)
- A Vercel account (optional, for deployment)

Verify Node is available:

```powershell
node --version
```

## Generate manifests (required before deploy)

This project uses manifest files under `songs1/` so the client-side app can list songs on static hosts where directory listing is disabled.

Run from the project root:

```powershell
node scripts/gen-manifest.js
```

This writes `manifest.json` into each subfolder (e.g. `songs1/cs/manifest.json`) and a top-level `songs1/manifest.json`.

## Run locally

Simply open `index.html` in your browser or use a Live Preview / static server. Example with a simple HTTP server (PowerShell):

```powershell
# Using Node's http-server (install globally if needed)
# npm i -g http-server
http-server -c-1 .
# or with Python
python -m http.server 5500
```

Then open `http://localhost:5500` (or the port your server used).

## Commit and push

After generating manifests and verifying locally, commit and push to your GitHub repo:

```powershell
git add .
git commit -m "Add generated song manifests and auth pages"
git push
```

Vercel (connected to your GitHub repository) will pick up the push and deploy the site.

## Verify deployment

After Vercel finishes deploying, check these endpoints in your browser or with `curl`/PowerShell `Invoke-WebRequest`:

- Top-level manifest:
  - `https://<your-vercel-url>/songs1/manifest.json`
- Per-folder manifest (example):
  - `https://<your-vercel-url>/songs1/cs/manifest.json`
- A sample audio file (note: filenames may need URL-encoding):
  - `https://<your-vercel-url>/songs1/cs/<encoded-filename>.mp3`

PowerShell example to fetch and pretty-print the top manifest:

```powershell
(Invoke-WebRequest "https://<your-vercel-url>/songs1/manifest.json").Content | ConvertFrom-Json
```

To test a single audio URL response headers:

```powershell
(Invoke-WebRequest -Method Head "https://<your-vercel-url>/songs1/cs/your-file-name.mp3").Headers
```

If the manifest or audio URL returns HTML (e.g., a Vercel 404 page), the player will fail to load the audio. Ensure the paths match and files exist in the repository.

## Demo auth notes

- The `signup.html` and `login.html` pages implement a client-side demo using `localStorage` and SHA-256 password hashing.
- This is only for demonstration and testing — it is NOT secure for production. Use server-side authentication (Firebase Auth, Auth0, or your own backend) for real user accounts.

## Troubleshooting

- If audio fails to play on the deployed site, open DevTools Console and Network tab and verify:
  - The manifest returned valid JSON
  - Audio URLs return status `200` and proper audio `Content-Type` (e.g., `audio/mpeg`)
- If filenames contain spaces or non-ASCII characters, ensure the client encodes them (the app uses `encodeURIComponent` when building audio URLs).

## Optional: regenerate manifests automatically (CI)

You can add a short GitHub Action to run `node scripts/gen-manifest.js` before committing, or run it in your local workflow before `git add`.

---

If you'd like, I can:
- Add a tiny `package.json` and an npm script `npm run gen-manifest` to simplify the command, or
- Create a GitHub Action that regenerates manifests on push and commits them automatically.

Tell me which you'd prefer and I'll add it.