# Neo Heights — static marketing site

Production-oriented HTML/CSS/JS recreation of the Neo Heights website (desktop + mobile).

## Run locally
```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

## Pages (31+)
- Core: Home, About, Projects, Services, Sustainability, Newsroom, Contact, Terms, Privacy, 404
- `services/*` (7) · `projects/*` (15)

## Structure
- `css/` — tokens, base, header/footer, components, responsive, page CSS
- `js/chrome.js` — shared header/footer, mega menus, theme, mobile nav
- `js/site.js` — forms, filters, lazy images, verticals close
- `assets/` — images/videos
- `netlify.toml`, `robots.txt`, `sitemap.xml` — hosting/SEO

## Notes
- Contact forms use Netlify Forms attributes; local submit shows a success message.
- Theme preference is stored in `localStorage` (`nh-theme`).
