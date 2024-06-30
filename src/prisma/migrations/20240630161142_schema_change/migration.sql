/*
  Warnings:

  - You are about to drop the column `libraryTeamId` on the `RejectionMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RejectionMessage" DROP CONSTRAINT "RejectionMessage_libraryTeamId_fkey";

-- AlterTable
ALTER TABLE "RejectionMessage" DROP COLUMN "libraryTeamId";
