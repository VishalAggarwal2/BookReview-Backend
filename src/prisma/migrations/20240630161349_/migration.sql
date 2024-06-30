/*
  Warnings:

  - Added the required column `libraryTeamId` to the `RejectionMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RejectionMessage" ADD COLUMN     "libraryTeamId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RejectionMessage" ADD CONSTRAINT "RejectionMessage_libraryTeamId_fkey" FOREIGN KEY ("libraryTeamId") REFERENCES "LibraryTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
