# egg-web

Static marketing/description site for **El Gordo Gekko (EGG)** — a personal trading-bot
experiment. Plain HTML, CSS and JS: no build step, no dependencies, no backend.

```
index.html
assets/
  css/styles.css
  js/main.js
  img/            ← hero + gallery art, favicon
```

## Run locally

Open `index.html` directly, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8080
```

## Notes

- Art is copied from the bot repo (`el-gordo-gekko/public`). The hero PNG is ~3 MB — worth
  running through an optimizer (or exporting a WebP) before this goes on a real host.
- The scrolling ticker in the hero is **decorative**. Its contents are hard-coded in
  `assets/js/main.js`; they are not quotes, positions or results.
- The site states plainly that EGG is not publicly available and is not financial advice
  (§06 "Availability"). Keep that section if the page is ever published.
