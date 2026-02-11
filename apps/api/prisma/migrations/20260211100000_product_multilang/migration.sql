-- Step 1: Add new nullable columns
ALTER TABLE "products" ADD COLUMN "titleRo" TEXT;
ALTER TABLE "products" ADD COLUMN "titleRu" TEXT;
ALTER TABLE "products" ADD COLUMN "descriptionRo" TEXT;
ALTER TABLE "products" ADD COLUMN "descriptionRu" TEXT;

-- Step 2: Copy existing data to both locales
UPDATE "products" SET
  "titleRo" = "title",
  "titleRu" = "title",
  "descriptionRo" = "description",
  "descriptionRu" = "description";

-- Step 3: Make new columns NOT NULL
ALTER TABLE "products" ALTER COLUMN "titleRo" SET NOT NULL;
ALTER TABLE "products" ALTER COLUMN "titleRu" SET NOT NULL;
ALTER TABLE "products" ALTER COLUMN "descriptionRo" SET NOT NULL;
ALTER TABLE "products" ALTER COLUMN "descriptionRu" SET NOT NULL;

-- Step 4: Drop old columns
ALTER TABLE "products" DROP COLUMN "title";
ALTER TABLE "products" DROP COLUMN "description";
