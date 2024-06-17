/*
  Warnings:

  - Added the required column `bookReview` to the `BookReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookReview" ADD COLUMN     "bookReview" TEXT NOT NULL,
ALTER COLUMN "bookImageUrl" DROP NOT NULL;
