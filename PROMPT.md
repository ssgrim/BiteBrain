# Codespaces AI Bootstrap Prompt

You are an expert full‑stack generator. Finish scaffolding this monorepo using **pnpm** and **Turborepo**.

## Requirements
- Create a Turborepo with the following packages and apps:
  - apps/web: Next.js 14 (App Router, TS, Tailwind). Add a Map page with a placeholder map component and geolocation dot.
  - apps/mobile: Expo (React Native, TS). Add a simple tab screen with "Plan" and "Log".
  - packages/ui: shared UI components using Tailwind + shadcn/ui (button, card).
  - packages/core: export a `recommend()` function that returns 3 patterns/lures given mocked `conditions` (season, wind, sky, temp, clarity).
  - services/api: Node/TypeScript AWS Lambda handler with a `/recommend` function that wraps `packages/core`.
- Configure repo tooling:
  - Root `tsconfig.base.json` and per‑package tsconfig.json files.
  - ESLint + Prettier; Tailwind in web/ui; Husky pre‑commit (lint & test).
  - pnpm workspaces; turbo.json pipelines for `build`, `lint`, `test`, `dev`.
  - Example `.env.example` for web/mobile/api with MAPBOX_TOKEN, API_BASE_URL, AWS_REGION.
- Devcontainer:
  - Node LTS, pnpm, AWS CLI v2, Terraform, jq. Add postCreateCommand to run `pnpm install`.
- Add GitHub Actions:
  - CI workflow: install pnpm, cache, `pnpm -w lint && pnpm -w test && pnpm -w build`.
- Seed data:
  - packages/core: include `species/largemouth.json` with seasonal notes.
  - tests for `recommend()` returning deterministic mock output.

## Deliverables
- Fill out all package.json files with scripts.
- Create minimal working pages:
  - `apps/web/app/page.tsx` shows conditions + mock recommendations.
  - `apps/mobile` splash + tabs.
- Do **not** commit secrets. Use `.env.example` only.

Return: file tree + key files.
