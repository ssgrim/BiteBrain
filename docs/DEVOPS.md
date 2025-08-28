# DevOps

## CI
GitHub Actions workflow runs lint, test, build on pushes/PRs to `main` and `dev`.

## Releases
- Merge `dev` → `main` with a Release PR.
- Tag using `vMAJOR.MINOR.PATCH`.
- Changelog updates via `CHANGELOG.md`.

## Environments
- Terraform workspaces per env.
- Parameterize with SSM or Secrets Manager.
