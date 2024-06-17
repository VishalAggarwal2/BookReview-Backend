-- CreateTable
CREATE TABLE "LibraryTeam" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LibraryTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LibraryTeam" ADD CONSTRAINT "LibraryTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
