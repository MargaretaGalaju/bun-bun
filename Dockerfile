# ── Stage 1: Install dependencies ────────────────────────────────
FROM node:20-alpine AS deps

# argon2 requires native build tools
RUN apk add --no-cache python3 make g++

RUN corepack enable && corepack prepare pnpm@10.19.0 --activate

WORKDIR /app

# Copy only files needed for pnpm install (cache-friendly layer)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/

# Install all dependencies (including devDependencies for building)
RUN pnpm install --frozen-lockfile

# Force native build for argon2 (ignored by onlyBuiltDependencies)
RUN pnpm rebuild argon2

# ── Stage 2: Build shared + API ─────────────────────────────────
FROM deps AS builder

WORKDIR /app

# Copy source code (node_modules excluded via .dockerignore)
COPY tsconfig.base.json ./
COPY packages/shared/src packages/shared/src
COPY packages/shared/tsconfig.json packages/shared/
COPY packages/shared/tsup.config.ts packages/shared/
COPY apps/api/src apps/api/src
COPY apps/api/tsconfig.json apps/api/
COPY apps/api/nest-cli.json apps/api/
COPY apps/api/prisma apps/api/prisma

# Build shared package first (API depends on it)
RUN pnpm --filter @bun-bun/shared build

# Generate Prisma client
RUN cd apps/api && npx prisma generate

# Build NestJS API
RUN pnpm --filter @bun-bun/api build

# ── Stage 3: Production runner ───────────────────────────────────
FROM node:20-alpine AS runner

# openssl needed for Prisma engine
RUN apk add --no-cache openssl curl

WORKDIR /app

# Copy node_modules (includes Prisma engine + all deps)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

# Copy built artifacts
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

# Copy Prisma schema + migrations (needed for migrate deploy)
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Copy workspace root files needed at runtime
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./

ENV NODE_ENV=production
EXPOSE 3000

USER node

CMD ["node", "apps/api/dist/main.js"]
