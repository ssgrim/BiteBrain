# HTTP API (draft)

- `GET /health` → 200
- `POST /recommend` → body: { species, conditions } → recs[]
- `GET /tackle` / `POST /tackle` … CRUD
- `GET /trips` / `POST /trips`
- `POST /import/gpx` → spots/tracks
- `GET /waterbodies/:id/regs` → cached notes + link to official

Auth via Cognito; all responses JSON.
