## The product question

Most stock tools collapse complex evidence into a confident-looking score. EventAlpha is being developed as a research and decision-support platform that keeps market data, evidence, model context, risk, and uncertainty visible.

The goal is not to produce a guaranteed buy or sell instruction. The platform should help a researcher inspect why an opportunity is surfaced, what evidence supports it, and when the system has no clear edge.

## What currently exists

The current repository contains a modular product stack:

- a React frontend and Express API;
- a FastAPI internal AI service;
- PostgreSQL with vector support, Redis workers, and MinIO storage;
- market-data ingestion and technical feature preparation;
- local model training, reviewed release packages, a model registry, promotion, and inference workflows;
- corporate-action and news evidence processing;
- reporting, job tracking, and automation workflows.

Early experiments evaluated several models. Random Forest produced the strongest result in one training comparison, but it is an experimental baseline rather than an active production model.

## What I own

I designed and iterated on the system architecture, container deployment, data and training workflow, model registry, operational boundaries, and evidence-oriented product flow. A large part of the engineering work has been reducing ambiguity: separating local training from Docker inference, validating release artifacts, preventing seed data from entering real training, and documenting when the system falls back to news-only output.

## Current capability versus roadmap

Corporate-action and news processing is implemented. A complete fundamental or money-management analysis layer remains on the roadmap. Technical market features and experimentation exist, but a unified technical-screening product workflow is still being developed.

The cover diagram on this page represents the target screening workflow: market data, news, and technical evidence feeding an AI-supported decision layer. It should not be read as a claim that every source is already fused into one validated production model.

## Reliability and honesty constraints

The platform treats yfinance as a convenience data source, not an exchange-grade contractual feed. Model confidence is not yet calibrated. News is a separate evidence layer and should not raise or reverse technical confidence until an out-of-sample fusion plan is validated.

These caveats are part of the product, not footnotes to hide after the demo. EventAlpha is still in development, and its waitlist will open after a stable public experience exists.
