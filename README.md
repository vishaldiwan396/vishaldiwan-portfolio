# vishaldiwan396.github.io/vishaldiwan-portfolio

Portfolio site. Vite + React.

## Dev

```
npm install
npm run dev
```

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`.

No custom domain. The site is served from the repository subpath, which
is why `vite.config.js` sets `base: './'` — an absolute base produces a
blank page there because every asset resolves to the domain root.

GitHub repo settings → Pages → Source must be set to "GitHub Actions",
and the Custom domain field must be empty.
