## The repetitive problem

Checking one domain is trivial. Checking dozens of product, campaign, or brand ideas one by one is slow and produces messy notes. DomainDesk turns the process into a single batch workflow without requiring a login, API key, database, or continuously running application backend.

## Product workflow

Users paste a list containing up to 100 domains. The application extracts hostnames, normalizes input, removes duplicates, and begins checking public registry RDAP endpoints.

![DomainDesk input workflow](/assets/images/projects/domaindesk/input.webp "Users can paste a mixed list and start one batch check.")

During processing, the interface shows progress and summary counts. Results are normalized into available, registered, unsupported, and uncertain states. Users can cancel the batch, search the result set, filter by status, and export the visible data.

![DomainDesk processing and result interface](/assets/images/projects/domaindesk/results.webp "Progress, status counts, filters, search, cancellation, and export stay in one workflow.")

![CSV output produced by DomainDesk](/assets/images/projects/domaindesk/csv-output.webp "The exported dataset includes domain, normalized status, timestamp, and detail.")

## What I built

I implemented the browser-side checking engine and user flow:

- flexible input parsing for lines, spaces, commas, semicolons, and full URLs;
- hostname normalization and duplicate removal;
- IANA RDAP bootstrap discovery and authoritative registry requests;
- a bounded concurrency queue;
- request timeout, one retry, and cancellation;
- normalized result states and user-facing detail messages;
- filtering, search, progress reporting, and CSV export;
- a static Netlify deployment with no application backend.

## Engineering trade-offs

Public RDAP makes a no-key product possible, but registry support and response behavior are not perfectly uniform. DomainDesk therefore distinguishes unsupported and uncertain results instead of pretending every TLD can be resolved with equal confidence.

The application is a discovery and shortlisting tool, not a registrar. Availability must still be verified with a registrar before purchase. This boundary keeps the copy accurate and prevents a public registry response from becoming a false promise.

## Outcome

DomainDesk is live and converts a repetitive manual task into a searchable, cancellable, and exportable workflow. It was built under a constrained engineering evaluation where the product had to remain simple, deployable, and useful without paid infrastructure.
