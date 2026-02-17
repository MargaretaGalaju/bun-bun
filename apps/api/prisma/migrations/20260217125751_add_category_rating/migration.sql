-- AlterTable: Add rating column to categories (idempotent)
DO $$ BEGIN
  ALTER TABLE "categories" ADD COLUMN "rating" INTEGER NOT NULL DEFAULT 1;
EXCEPTION WHEN duplicate_column THEN
  NULL;
END $$;
