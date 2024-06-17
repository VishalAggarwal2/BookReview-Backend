/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "RejectionMessage" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "bookReviewId" INTEGER NOT NULL,
    "libraryTeamId" INTEGER NOT NULL,

    CONSTRAINT "RejectionMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RejectionMessage" ADD CONSTRAINT "RejectionMessage_bookReviewId_fkey" FOREIGN KEY ("bookReviewId") REFERENCES "BookReview"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RejectionMessage" ADD CONSTRAINT "RejectionMessage_libraryTeamId_fkey" FOREIGN KEY ("libraryTeamId") REFERENCES "LibraryTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
