## The product question

EventAlpha is an R&D product for **Indonesian stock recommendations**, not a brokerage or trading-execution application. The current product question is narrower than the original platform idea: can several understandable evidence streams help a user decide what deserves further attention without turning the result into a magical buy button?

## The current three-part direction

The working product direction is a three-part screen:

- **market behavior**, where MarketCore explores price/market features and forecasting or statistical experiments;
- **company and event evidence**, where NewsLens tracks relevant disclosures, corporate actions, and whether an event is still active or has effectively expired;
- **investability / statistical context**, where interpretable indicators can help prevent a recommendation from depending on one model output alone.

The exact variables are still being reduced. The front-facing product should remain understandable even if the internal research uses many features.

## What currently exists

The repository already contains modular services and experimentation infrastructure across React, Express, FastAPI, PostgreSQL, containerized local services, data preparation, model experimentation, and evidence processing.

The current engineering priority is **stabilization with available data**, not adding paid data dependencies or presenting every exploratory component as production-ready. Some data sources and collection paths are still under review, including how IDX documents should be collected and maintained responsibly.

## What I own

I design the product and system architecture, service boundaries, container setup, experiment workflow, evidence lifecycle, and capability boundaries. I also use the project as a forcing function for deciding what *not* to build: execution trading, opaque recommendation scores, and large data dependencies are deliberately outside the current scope.

## Recommendation, not execution

EventAlpha is intended to surface candidates and evidence for further review. It does not place trades, manage brokerage accounts, or claim guaranteed returns. This keeps the engineering problem focused on recommendation quality, evidence relevance, and explainability while avoiding pretending that an experimental system is a regulated execution product.

## Current constraint

The main blocker is no longer architecture breadth. It is deciding which data can be obtained consistently enough to support a narrow, trustworthy screening workflow. Until that is stable, new models are less valuable than a smaller product with explicit data provenance and evidence expiry.
