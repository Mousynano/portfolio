# Netlify deployment

## Recommended: deploy from a private Git repository

1. Push this project to a private GitHub repository.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Netlify reads the build settings from `netlify.toml`:

```text
Build command: npm run build
Publish directory: dist
Node version: 22
```

4. Deploy.
5. After Netlify assigns the production domain, set `siteUrl` in `src/data/site.json` to the final origin, for example:

```json
"siteUrl": "https://your-site.netlify.app"
```

6. Deploy once more. This enables absolute canonical URLs, Open Graph images, alternate-language links, and `sitemap.xml`.

## Manual Netlify Drop

Use the separate Netlify bundle and upload its extracted contents to Netlify Drop. The bilingual pages, resume, certificates, and project images are already inside the bundle.
