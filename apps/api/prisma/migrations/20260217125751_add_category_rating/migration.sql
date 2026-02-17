-- AlterTable: Add rating column to categories
ALTER TABLE "categories" ADD COLUMN "rating" INTEGER NOT NULL DEFAULT 1;
