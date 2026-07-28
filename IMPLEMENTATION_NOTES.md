# Implementation notes

## Content model

- Shared project metadata and bilingual card copy: `src/data/projects.json`
- Site profile, capabilities, toolkit, proof points, credentials: `src/data/site.json`
- Long-form English and Indonesian articles: `src/portfolio/<slug>/en.md` and `id.md`
- Project-specific media: `src/images/projects/<slug>/`

## Routes

```text
/                 locale redirect
/en/              English home
/id/              Indonesian home
/en/work/         English work index
/id/work/         Indonesian work index
/en/resume/       English resume
/id/resume/       Indonesian resume
/<locale>/work/<slug>/
```

The language switch keeps the visitor on the equivalent route and saves the choice in `localStorage`.

## Project progression filters

The Work page supports one progression filter and one capability filter at a time. EventAlpha can be selected through **Open Waitlist**, even though its main progression remains **In Development**.

## Accuracy boundaries

- FACETRO uses report-era deployed evidence. Later HAProxy/Tailscale hardening designs are not promoted as deployed work.
- Fingerprint Attendance is labeled an installed R&D prototype, not a production client deployment.
- EventAlpha distinguishes implemented capabilities from roadmap features. Random Forest is described as an experimental result, not an active production model.
- DQN and tilapia are labeled research collaborations with the user's exact contribution scope.
- The current resume PDF is preserved unchanged. See `CV_REVIEW.md` before publishing a rewritten version.
