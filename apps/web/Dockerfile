FROM node:20-alpine AS builder
WORKDIR /repo
RUN corepack enable

# Build-time public env for Next.js (must be available during `next build`)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm -C packages/shared build
RUN pnpm -C apps/web build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Standalone output (monorepo structure -> server.js lives in /app/apps/web/)
COPY --from=builder /repo/apps/web/.next/standalone ./

# Static files must be next to the standalone server location
COPY --from=builder /repo/apps/web/.next/static /app/apps/web/.next/static

EXPOSE 3000
CMD ["node", "/app/apps/web/server.js"]
