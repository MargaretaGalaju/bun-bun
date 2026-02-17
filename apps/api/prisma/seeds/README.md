# Seeds Directory

This directory contains seed data for the bun-bun marketplace database.

## Files

### `categories.ts`
TypeScript data file containing all 117 categories:
- 14 main categories (with image URLs and custom ratings)
- 103 subcategories (properly hierarchized)

Exported from local database on 2026-02-17.

### `categories.sql`
Standalone SQL file (~23KB) that can be executed directly with psql.
Generated automatically from `categories.ts`.

Includes:
- DELETE statements to clear existing data
- INSERT statements for all 117 categories
- Proper ordering (main categories first, then subcategories by parent)

### `generate-sql.ts`
Utility script to regenerate `categories.sql` from `categories.ts`.

Run with:
```bash
npx tsx prisma/seeds/generate-sql.ts
```

## Usage

### With Prisma (Recommended)
```bash
npx prisma db seed
```

### With SQL Directly
```bash
psql $DATABASE_URL -f prisma/seeds/categories.sql
```

## Data Summary

- **Total Categories**: 117
- **Main Categories**: 14 (all have image URLs)
- **Subcategories**: 103
- **Hierarchy Levels**: 2-3 (some categories have nested subcategories)

Main categories with ratings (for display order):
1. Fructe & Legume (100)
2. Lactate & Brânzeturi (99)
3. Carne & Produse din Carne (98)
4. Miere & Produse Apicole (97)
5. Ouă & Produse din Ouă (96)
6. Conserve & Murături (95)
7. Panificație & Patiserie (94)
8. Nuci, Semințe & Produse Derivate (93)
9. Others (rating 1)

## Updating Category Data

If you need to update the categories:

1. Make changes in your local database
2. Export updated data:
   ```bash
   npx tsx scripts/export-categories.ts > /tmp/new-categories.txt
   ```
3. Update `categories.ts` with the new data
4. Regenerate SQL file:
   ```bash
   npx tsx prisma/seeds/generate-sql.ts
   ```
5. Test locally:
   ```bash
   npx prisma db seed
   ```
6. Commit and deploy to production

## See Also

- [DEPLOYMENT.md](../DEPLOYMENT.md) - Full deployment guide for production
- [seed.ts](../seed.ts) - Main seed script that uses this data
