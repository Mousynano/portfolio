# Fauzi Portfolio

A static bilingual portfolio built for Netlify. Content is organized by project and language so updates do not require editing templates.

## Project structure

```text
src/
├── data/
│   ├── site.json          # profile, capabilities, credentials, contact
│   └── projects.json      # shared project metadata and card copy
├── images/
│   └── projects/<slug>/   # cover and article resources
├── portfolio/<slug>/
│   ├── en.md              # English article
│   └── id.md              # Indonesian article
├── styles/global.css
└── templates/base.html

public/
├── resume.pdf
├── credentials/
└── site.js
```

## Run locally

```bash
npm run check
npm run dev
```

Open `http://localhost:4173`.

## Production build

```bash
npm run build
```

Netlify publishes `dist/` using `netlify.toml`.

## Update a project

1. Edit common metadata and card copy in `src/data/projects.json`.
2. Edit the article in `src/portfolio/<slug>/en.md` and `id.md`.
3. Put screenshots or diagrams in `src/images/projects/<slug>/`.
4. Reference an image from Markdown:

```md
![Useful alt text](/assets/images/projects/<slug>/image.webp "A caption that explains what the reader should notice.")
```

5. Run `npm run check && npm run build`.

## Important content rule

Current implementation, deployed work, prototypes, research collaboration, and roadmap items must remain clearly labeled. A portfolio is supposed to reduce ambiguity, not manufacture it with prettier typography.
