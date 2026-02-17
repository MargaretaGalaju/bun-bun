-- AlterTable: Add multilanguage support and hierarchy to categories
ALTER TABLE "categories" ADD COLUMN "nameRu" TEXT;
ALTER TABLE "categories" ADD COLUMN "nameRo" TEXT;
ALTER TABLE "categories" ADD COLUMN "imageUrl" TEXT;
ALTER TABLE "categories" ADD COLUMN "parentId" TEXT;

-- AddForeignKey for self-referential hierarchy
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
