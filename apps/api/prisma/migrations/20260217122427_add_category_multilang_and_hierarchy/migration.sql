-- AlterTable: Add multilanguage support and hierarchy to categories (idempotent)
DO $$ BEGIN
  ALTER TABLE "categories" ADD COLUMN "nameRu" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "categories" ADD COLUMN "nameRo" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "categories" ADD COLUMN "imageUrl" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "categories" ADD COLUMN "parentId" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- AddForeignKey for self-referential hierarchy (idempotent)
DO $$ BEGIN
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
