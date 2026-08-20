# JoDy's Admin

Back-office + API catalogue pour l'app Expo JoDy's.

- Prod : https://jodys.ebabientreprise.com
- Public API : `GET /api/v1/catalog`, `GET /api/v1/catalog/version`, `GET /api/v1/health`
- Auth admin : Google OAuth + `ADMIN_EMAILS`

## Dev local

```bash
cp .env.example .env
# DATABASE_URL pointe vers Postgres (tunnel ou local)
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## Coolify

- Build pack : Dockerfile
- Port : 3000
- Healthcheck : `/api/v1/health`
- Env : voir `vps-infra/secrets/apps/jodys-production.env`
