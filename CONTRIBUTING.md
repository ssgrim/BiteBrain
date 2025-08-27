# Contributing to BiteBrain

Thanks for helping!

## Workflow
1. Create an issue (bug/feat/chore) using a template.
2. Branch from `dev`: `feat/<scope>-<short-desc>`.
3. Commit using Conventional Commits (e.g., `feat(core): add pre-spawn rules`).
4. Open a PR to `dev` with the PR template. CI must pass.
5. After review, squash-merge. Release PRs promote `dev` → `main`.

## Local dev
- Use **pnpm**. From repo root:
  - `pnpm i`
  - `pnpm dev` (turborepo pipeline)
- Apps live in `apps/*`; packages in `packages/*`.
- Add tests for core logic (`packages/core`).

## Style
- TypeScript strict mode.
- ESLint + Prettier (run `pnpm -w lint`).
- Keep functions small & pure in `packages/core`.
- No secrets in code — use `.env.*`.

## GitHub conventions
- Labels: `feat`, `bug`, `infra`, `docs`, `good-first-issue`.
- Projects: “BiteBrain” (Kanban).
- Milestones: MVP → Phase 2 → Integrations.

## Security
Report vulnerabilities privately: see [SECURITY.md](SECURITY.md).
