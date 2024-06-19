-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "BookReview" (
    "reviewId" SERIAL NOT NULL,
    "bookName" TEXT NOT NULL,
    "bookDsc" TEXT NOT NULL,
    "bookType" TEXT NOT NULL,
    "bookReview" TEXT NOT NULL,
    "bookImageUrl" TEXT,
    "presentAtLibrary" BOOLEAN NOT NULL,
    "referenceNumber" TEXT,
    "bookReviewByLcMember" BOOLEAN NOT NULL DEFAULT false,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "isRejected" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BookReview_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "LibraryTeam" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LibraryTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RejectionMessage" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "bookReviewId" INTEGER NOT NULL,
    "libraryTeamId" INTEGER NOT NULL,

    CONSTRAINT "RejectionMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "bookReviewId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "bookReviewId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_bookReviewId_key" ON "Like"("userId", "bookReviewId");

-- AddForeignKey
ALTER TABLE "BookReview" ADD CONSTRAINT "BookReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryTeam" ADD CONSTRAINT "LibraryTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RejectionMessage" ADD CONSTRAINT "RejectionMessage_bookReviewId_fkey" FOREIGN KEY ("bookReviewId") REFERENCES "BookReview"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RejectionMessage" ADD CONSTRAINT "RejectionMessage_libraryTeamId_fkey" FOREIGN KEY ("libraryTeamId") REFERENCES "LibraryTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_bookReviewId_fkey" FOREIGN KEY ("bookReviewId") REFERENCES "BookReview"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_bookReviewId_fkey" FOREIGN KEY ("bookReviewId") REFERENCES "BookReview"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;
