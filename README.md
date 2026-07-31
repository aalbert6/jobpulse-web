# jobspulse-web

Public site for **JobsPulse**, served via GitHub Pages at
[jobspulseapp.com](https://jobspulseapp.com).

Source of truth for the product lives in the private `jobpulse` repo; these pages are a
deploy snapshot of its `web/` + `web-app/`. Pages:

- `index.html` — landing / waitlist
- `join-r9x2m/` — unlisted intake form (noindex; shared by email only)
- `privacy/` — privacy notice
- `dashboard/` — premium dashboard (Supabase magic-link auth; your saved matches)

To update: edit the source in the `jobpulse` repo, copy the built page here (clean-URL
layout), commit, and push to `main` — Pages redeploys. `CNAME` pins the custom domain;
don't remove it.
