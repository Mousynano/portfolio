## The problem

A catalogue containing tens of thousands of internship listings is technically searchable, but still difficult to prioritize. Candidates need to know which opportunities match their evidence, which ones are highly competitive, what gaps remain, and what to improve before applying.

MagangRadar turns a frozen snapshot of 21,985 listings into two usable workflows: manual exploration and CV-aware prioritization.

## How people use it

Users can search the catalogue directly by position, location, education level, quota, and applicant count. When they want a more focused answer, they upload a PDF CV, provide optional role and location targets, consent to processing, and request an analysis.

![CV analysis entry point in MagangRadar](/assets/images/projects/magangradar/cv-upload.webp "The CV is processed only for the analysis request and is not stored by MagangRadar.")

The result is not presented as a mysterious acceptance probability. MagangRadar extracts a candidate profile, selects a smaller candidate set from the full catalogue, ranks up to ten recommendations, and explains why each role fits, what should be strengthened, and what action to take before applying.

![Candidate summary and first prioritized recommendation](/assets/images/projects/magangradar/recommendation-summary.webp "The interface separates profile evidence, fit, competition, and practical actions.")

![Additional prioritized recommendations](/assets/images/projects/magangradar/recommendation-list.webp "Recommendations retain links to the official listing so users can verify the source before applying.")

Users who do not want AI analysis can still compare the entire snapshot locally in the browser.

![Manual vacancy browser](/assets/images/projects/magangradar/job-browser.webp "Search and filtering run in the browser without calling the analysis function.")

## What I built

I designed and implemented the product architecture and recommendation flow:

- a static Next.js export serving the vacancy catalogue from Netlify CDN;
- local search, filters, pagination, and comparison without backend requests;
- a Netlify Function that accepts a PDF up to 3 MB and keeps the Gemini key server-side;
- structured CV extraction and a deterministic prefilter from 21,985 listings to at most 55 candidates;
- AI reranking of at most ten final recommendations;
- separate fit, competition, and feasibility concepts rather than one unexplained score;
- consent, no-store responses, input limits, rate limiting, and defensive prompt rules.

The feasibility score is a prioritization aid, not a probability of acceptance. That distinction is explicit in the product because false certainty would make the interface look impressive while making the advice worse.

## Architecture decisions

The job catalogue changes only when a new snapshot is intentionally prepared and deployed. That allowed the public browsing experience to remain static, fast, and inexpensive. AI is invoked only when a user uploads a CV, so normal search traffic does not consume model quota.

The serverless function first uses deterministic logic to reduce the search space. Sending all 21,985 listings to a model would be expensive, slow, and unnecessary. The model works only on a canonical shortlist and may only return known job keys.

## Outcome and limits

MagangRadar is live as a public product. It provides fast catalogue browsing and a recommendation workflow that produces a shortlist, reasoning, gaps, and actions. The dataset is a dated snapshot rather than a real-time feed, and every recommendation links back to the official listing for verification.
