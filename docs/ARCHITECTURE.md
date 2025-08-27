# Architecture Overview

## Frontend
- **Web**: Next.js 14 (App Router), Mapbox/MapLibre map view, Conditions panel, Plan/Log flows.
- **Mobile**: Expo React Native with offline cache and GPS.

## Backend
- **API**: Node/TypeScript serverless handlers exposing `/recommend`, `/tackle`, `/trips`, `/spots`.
- **Data**: DynamoDB tables for Users, Tackle, Trips, Catches, Spots, Species profiles.
- **Storage**: S3 for images, tile packs (MBTiles → XYZ), exports/imports (GPX/USR).
- **Auth**: Cognito (user pools).

## Core
`packages/core` holds the deterministic rules/scoring engine and season/species data. Pure functions; unit-tested.

## Infra
Terraform in `/infra/terraform` defines API Gateway, Lambdas, DynamoDB, Cognito, S3, and CloudFront. Environments via Terraform workspaces (`dev`, `prod`).

## Observability
CloudWatch (logs/metrics), structured JSON logs, and user-consent analytics events.
