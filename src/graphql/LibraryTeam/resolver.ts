import prisma from "../../Client/PrismaClient";

export const allInValidBookReview = async (ctx: any) => {
  try {
    const allBookReview = await prisma.bookReview.findMany({
      where: { isValidated: false }
    });

    console.log(allBookReview);
    return allBookReview;
  } catch (e) {
    console.error("Error fetching invalid book reviews:", e);
    return [];
  }
};





export const InvalidtoValidBookReview = async (ctx: any, { data }: { data: any }) => {
    try {
      // Check if the user is part of the library team
      const userId = data.userId;
      const reviewId = data.reviewId;
      
      const isLibraryTeam = await prisma.libraryTeam.findFirst({
        where: { userId: userId }
      });
  
      // If the user is not part of the library team, return an appropriate message
      if (!isLibraryTeam) {
        console.log(`User ${userId} is not part of the library team.`);
        return "Not Verified";
      }
  
      // Update the validity of the book review
      const updatedReview = await prisma.bookReview.update({
        where: { reviewId: reviewId },
        data: { isValidated: true }
      });
  
      console.log(updatedReview);
      return updatedReview;
  
    } catch (e) {
      console.error("Error updating book review validity:", e);
      return "An error occurred";
    }
  };



  export const rejectBookReview = async (ctx: any, { data }: { data: any }) => {
    try {
      const { userId, reviewId, rejectionMessage } = data;
  
      // Check if the user is part of the library team
      const isLibraryTeam = await prisma.libraryTeam.findFirst({
        where: { userId: userId }
      });
  
      // If the user is not part of the library team, return an appropriate message
      if (!isLibraryTeam) {
        console.log(`User ${userId} is not part of the library team.`);
        return "Not Authorized";
      }
  
      // Insert the rejection message into the RejectionMessage table
      const newRejectionMessage = await prisma.rejectionMessage.create({
        data: {
          message: rejectionMessage,
          bookReviewId: reviewId,
          libraryTeamId: isLibraryTeam.id,
        },
      });
  
      // Update the isRejected column of the BookReview table to true
      const updatedReview = await prisma.bookReview.update({
        where: { reviewId: reviewId },
        data: { isRejected: true },
      });
  
      console.log('Rejection Message:', newRejectionMessage);
      console.log('Updated Review:', updatedReview);
      
      return updatedReview;
  
    } catch (e) {
      console.error("Error rejecting book review:", e);
      return "An error occurred";
    }
  };