# Marketplace MVP

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

| Method | Path           | Description              |
| ------ | -------------- | ------------------------ |
| GET    | /health        | Health check             |
| POST   | /auth/register | Register a new user      |
| POST   | /auth/login    | Login                    |
| GET    | /me            | Get current user profile |
| GET    | /products      | List active products     |
| GET    | /products/:id  | Get product by ID        |
| GET    | /categories    | List categories          |

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start all apps in development mode |
| `pnpm build`       | Build all packages and apps        |
| `pnpm lint`        | Lint all packages                  |
| `pnpm test`        | Run tests (placeholder)            |
| `pnpm format`      | Format code with Prettier          |
| `pnpm db:generate` | Generate Prisma client             |
| `pnpm db:migrate`  | Run Prisma migrations              |
| `pnpm db:push`     | Push Prisma schema to DB           |

## Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **API:** NestJS 11, Prisma, PostgreSQL, Swagger
- **Web:** Next.js 15 (App Router), React 19
- **Mobile:** Expo SDK 54, React Navigation
- **Shared:** TypeScript types, Zod validation schemas
- **Tooling:** TypeScript 5.5+, ESLint 9, Prettier
