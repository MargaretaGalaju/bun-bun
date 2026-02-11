# BunBun MVP

Production-ready monorepo skeleton for a marketplace application.

**Stack:** NestJS + Next.js + Expo React Native + Prisma + PostgreSQL

## Prerequisites

- **Node.js** >= 20
- **pnpm** >= 10 — install via `corepack enable && corepack prepare pnpm@latest --activate` or `npm install -g pnpm`
- **Docker** — for running PostgreSQL locally

## Project Structure

```
apps/
  api/      — NestJS REST API (port 3000)
  web/      — Next.js web app (port 3001)
  mobile/   — Expo React Native app
packages/
  shared/   — Shared types, DTOs, Zod schemas
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres on host port **5433** (to avoid conflicts with a local Postgres on 5432) with:
- User: `marketplace`
- Password: `marketplace`
- Database: `marketplace_dev`

### 3. Set up the API environment

```bash
cp apps/api/.env.example apps/api/.env
```

### 4. Set up the database

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database (for development)
pnpm db:push
```

### 5. Run all apps

```bash
pnpm dev
```

This starts:
- **API** at [http://localhost:3000](http://localhost:3000)
- **Web** at [http://localhost:3001](http://localhost:3001)
- **Mobile** via Expo DevTools

### Running individual apps

```bash
pnpm --filter @bun-bun/api dev     # API only
pnpm --filter @bun-bun/web dev     # Web only
pnpm --filter @bun-bun/mobile dev  # Mobile only
```

## API Documentation (Swagger)

Swagger UI is available at: [http://localhost:3000/docs](http://localhost:3000/docs)

### API Endpoints

| Method | Path             | Description              |
|--------|------------------|--------------------------|
| GET    | /health          | Health check             |
| POST   | /auth/register   | Register a new user      |
| POST   | /auth/login      | Login                    |
| GET    | /me              | Get current user profile |
| GET    | /products        | List active products     |
| GET    | /products/:id    | Get product by ID        |
| GET    | /categories      | List categories          |

## Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `pnpm dev`       | Start all apps in development mode |
| `pnpm build`     | Build all packages and apps        |
| `pnpm lint`      | Lint all packages                  |
| `pnpm test`      | Run tests (placeholder)            |
| `pnpm format`    | Format code with Prettier          |
| `pnpm db:generate` | Generate Prisma client           |
| `pnpm db:migrate`  | Run Prisma migrations            |
| `pnpm db:push`     | Push Prisma schema to DB         |

## Cloudflare R2 (Image Uploads)

Product images are uploaded directly to Cloudflare R2 via presigned PUT URLs. The API never touches the file bytes — the browser uploads directly to R2.

### Setup

1. Create an R2 bucket named `bunbun-images` in Cloudflare dashboard
2. Enable **Public Development URL** for the bucket
3. Create an API token with R2 read/write permissions
4. Fill in the R2 env vars in `apps/api/.env` (see `.env.example`)

### R2 CORS Configuration

In the Cloudflare R2 dashboard, go to your bucket **Settings > CORS policy** and add:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3001"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "MaxAgeSeconds": 3600
  }
]
```

For production, replace `http://localhost:3001` with your actual web domain.

## Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **API:** NestJS 11, Prisma, PostgreSQL, Swagger
- **Web:** Next.js 15 (App Router), React 19
- **Mobile:** Expo SDK 54, React Navigation
- **Shared:** TypeScript types, Zod validation schemas
- **Tooling:** TypeScript 5.5+, ESLint 9, Prettier

---

## Production Deployment (Hetzner VPS)

The API, PostgreSQL, and a Caddy reverse proxy run on a Hetzner VPS via Docker Compose.
The Next.js web app is deployed separately on Vercel.

### Architecture

```
Internet
  │
  │ HTTPS (api.bunbun.market)
  ▼
┌─────────────────────────────────────────┐
│  Hetzner VPS  46.225.96.55              │
│                                         │
│  Caddy (:80/:443) ──► NestJS API (:3000)│
│         auto-TLS        │               │
│                         ▼               │
│                   PostgreSQL (:5432)     │
│                   (internal only)       │
└─────────────────────────────────────────┘
```

### DNS

`api.bunbun.market` → `46.225.96.55` (A record, already configured)

### Firewall (required open ports)

| Port | Protocol | Purpose        |
|------|----------|----------------|
| 22   | TCP      | SSH            |
| 80   | TCP      | HTTP (Caddy)   |
| 443  | TCP+UDP  | HTTPS (Caddy)  |

### Server directory structure

```
/opt/bunbun/
  repo/                  ← git clone of this repository
    .env.prod            ← production environment (NOT in git)
    docker-compose.prod.yml
    Dockerfile
    Caddyfile
    apps/api/...
    packages/shared/...
```

### `.env.prod` example

Create `/opt/bunbun/repo/.env.prod` on the server with these variables:

```bash
# Postgres (used by both db service and DATABASE_URL)
POSTGRES_USER=bunbun
POSTGRES_PASSWORD=<strong-random-password>
POSTGRES_DB=bunbun_prod

# Prisma connection (hostname "db" = docker service name)
DATABASE_URL="postgresql://bunbun:<same-password>@db:5432/bunbun_prod?schema=public"

# API
PORT=3000

# JWT
JWT_ACCESS_SECRET=<random-64-char-string>
JWT_REFRESH_SECRET=<random-64-char-string>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudflare R2 (image uploads)
R2_BUCKET=bunbun-images
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_REGION=auto
R2_ACCESS_KEY_ID=<your-r2-access-key>
R2_SECRET_ACCESS_KEY=<your-r2-secret-key>
R2_PUBLIC_BASE_URL=https://<your-r2-public-url>.r2.dev
R2_PRESIGN_EXPIRES_SECONDS=600
```

### First-time setup

```bash
# 1. SSH into the server
ssh user@46.225.96.55

# 2. Install Docker if not already installed
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in for group to take effect

# 3. Clone the repository
sudo mkdir -p /opt/bunbun
sudo chown $USER:$USER /opt/bunbun
git clone https://github.com/<your-org>/bun-bun.git /opt/bunbun/repo
cd /opt/bunbun/repo

# 4. Create the production env file
nano .env.prod
# Fill in all variables from the example above

# 5. Start everything
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# 6. Run database migrations
docker compose -f docker-compose.prod.yml exec -T api npx prisma migrate deploy --schema apps/api/prisma/schema.prisma

# 7. Verify
curl -f https://api.bunbun.market/health
```

### GitHub Actions (auto-deploy)

Every push to `main` triggers `.github/workflows/deploy.yml`, which SSH-es into the VPS and runs `git pull` + `docker compose up --build` + `prisma migrate deploy` + health check.

**Required GitHub Secrets:**

| Secret         | Value                           |
|----------------|---------------------------------|
| `VPS_HOST`     | `46.225.96.55`                  |
| `VPS_USER`     | SSH username (e.g. `deploy`)    |
| `VPS_SSH_KEY`  | Private SSH key (ed25519/rsa)   |
| `VPS_PORT`     | SSH port (default `22`)         |

### Viewing logs

```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# API only
docker compose -f docker-compose.prod.yml logs -f api

# Database
docker compose -f docker-compose.prod.yml logs -f db

# Caddy
docker compose -f docker-compose.prod.yml logs -f caddy
```

### Rollback

```bash
cd /opt/bunbun/repo

# 1. Check recent commits
git log --oneline -10

# 2. Roll back to a specific commit
git checkout <commit-hash>

# 3. Rebuild and restart
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# 4. Re-run migrations (if needed)
docker compose -f docker-compose.prod.yml exec -T api npx prisma migrate deploy --schema apps/api/prisma/schema.prisma

# 5. Verify
curl -f https://api.bunbun.market/health

# 6. To go back to latest main
git checkout main
git pull origin main
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```
