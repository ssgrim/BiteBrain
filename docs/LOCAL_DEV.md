# Local Development

Prereqs: Node 20+, pnpm, (optional) Mapbox token.

```bash
pnpm i
pnpm dev
```

Set environment files:
- `apps/web/.env` → `MAPBOX_TOKEN=...` `API_BASE_URL=http://localhost:8787`
- `services/api/.env` → `AWS_REGION=us-west-2` (for local-only mocks, no creds needed).
