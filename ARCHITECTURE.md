# Architecture Overview

This project uses a **Turborepo** monorepo structure with shared packages and services.

## Structure
- `apps/web`: Next.js app (planning, maps, recommendations)
- `apps/mobile`: Expo app (trip planner, logbook)
- `packages/core`: scoring engine (patterns, lures, seasonal logic)
- `packages/ui`: shared UI components (Tailwind + shadcn)
- `services/api`: AWS Lambda handlers, REST endpoints
- `infra/terraform`: IaC for AWS

## Data Flow
1. **User input**: target species, trip duration, tackle inventory.
2. **Conditions fetch**: weather API, solunar calc, USGS gauges.
3. **Scoring engine**: rules + weights produce ranked patterns.
4. **API**: returns recommendations, logs trips/catches.
5. **Clients**: web/mobile display plan, maps, offline tiles.

## Environments
- `dev`: preview/staging
- `prod`: production (stable)

## DevContainer
- Node LTS, pnpm, AWS CLI, Terraform preinstalled for consistent onboarding.
