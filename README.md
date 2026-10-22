# Dutch Causal Inference Network — Website

Static website for [causalinference.nl](https://www.causalinference.nl), built with [Hugo](https://gohugo.io) and a custom `academia` theme.

---

## Prerequisites — install Hugo

You need Hugo v0.100 or later. Pick the method for your OS:

### macOS (Homebrew)
```bash
brew install hugo
```

### Windows (Winget)
```powershell
winget install Hugo.Hugo
```

### Windows (Scoop)
```powershell
scoop install hugo
```

### Linux (apt — Ubuntu/Debian)
```bash
sudo apt-get update && sudo apt-get install hugo
```

### Any OS — download the binary directly
Go to https://github.com/gohugoio/hugo/releases, download the archive for your OS, and place the `hugo` executable somewhere on your `$PATH`.

Verify the installation:
```bash
hugo version
```

---

## Run the site locally

```bash
# 1. Clone the repo (if you haven't already)
git clone https://github.com/causalinferencenl/causalinferencenl.git
cd causalinferencenl

# 2. Start the development server
hugo server

# 3. Open your browser at http://localhost:1313
```

Hugo watches for file changes and reloads the browser automatically.

To see a production-like build (minified, no drafts):
```bash
hugo server --minify --environment production
```

---

## How to edit content

All editable content lives in two places: the front-matter of `content/_index.md` (About section) and the YAML files under `data/`.

### About section

Open `content/_index.md`. The text under `about_body:` is plain Markdown — edit it freely.

```yaml
about_title: "About the Network"
about_body: |
  Your text here. Supports **bold**, *italic*, bullet lists, etc.
```

### People

Edit `data/people.yaml`. Each person is one block:

```yaml
- name: "Full Name"
  role: "e.g. Associate Professor"
  affiliation: "University or institute"
  email: "name@domain.nl"          # optional — shown as a mailto link
  website: "https://..."           # optional — name becomes a clickable link
  photo: "images/people/name.jpg"  # optional — place the file in static/images/people/
  bio: "One or two sentences."     # optional
```

To **add** a person: copy one block, paste it at the end, and fill in the fields.  
To **remove** a person: delete the entire block (from `- name:` down to the next one).  
To **add a photo**: place the image in `static/images/people/` and set `photo: "images/people/yourfile.jpg"`.

### Events

All events, past and upcoming, live in a single list in `data/events.yaml`. You never need to move an event between sections: events dated **today or later** appear under *Upcoming Events* (soonest first), and events **at least one day old** appear under *Past Events* (most recent first). The order of entries in the file does not matter.

```yaml
- title: "Quarterly Meeting — Q3 2026"
  date: "2026-07-03"               # ISO format YYYY-MM-DD
  time: "14:00–17:00 CET"          # optional
  location: "University X, Room Y, Address"  # optional
  abstract: "Short description."   # optional
  registration: "https://..."      # optional — hidden once the event is past
  talks:                           # optional — use talks: [] if none are known yet
    - title: "Talk title"
      speaker: "Dr. Name"
      affiliation: "University"
      slides: "files/slides/2026-07-talk1.pdf"   # optional
      recording: "https://..."                   # optional
```

To **add slides**: place the PDF in `static/files/slides/` and set `slides: "files/slides/yourfile.pdf"`.

No rebuild is needed when an event passes: each event is stamped with the moment it becomes past (midnight Amsterdam time after the event day), and a small script in the browser moves it from *Upcoming Events* to *Past Events* at that moment, even while the page is open. Without JavaScript, the split from the last build is shown.

---

## Site configuration

Global settings (site title, nav labels, hero text) live in `hugo.toml`:

```toml
[params]
  heroTitle    = "Consortium for Safe Causal Inference"
  heroSubtitle = "Your tagline here."

[[params.nav]]
  label = "About"
  href  = "#about"
```

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main` via the workflow at `.github/workflows/deploy.yml`.

**One-time setup (do this once per repository):**

1. Go to **Settings → Pages** in your GitHub repository.
2. Under *Build and deployment*, set the source to **GitHub Actions**.
3. Push any commit to `main` — the workflow will build and publish the site.

The live site will be available at the URL in your `CNAME` file (currently `www.causalinference.nl`).

---

## Project structure

```
.
├── content/
│   └── _index.md          # About section text
├── data/
│   ├── people.yaml        # People / key contacts
│   └── events.yaml        # All events — sorted into upcoming/past automatically
├── static/
│   ├── images/people/     # Place member photos here
│   └── files/slides/      # Place presentation PDFs here
├── themes/academia/
│   ├── layouts/           # HTML templates (edit only if customising layout)
│   └── static/css/        # Stylesheet (edit only if customising design)
├── hugo.toml              # Site-wide configuration
└── .github/workflows/
    └── deploy.yml         # Automatic GitHub Pages deployment
```
