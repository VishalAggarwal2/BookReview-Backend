import prisma from "../../Client/PrismaClient";
export const addLike = async (parent:any, args:any) => {
  const { userId, bookReviewId } = args;

  try {
    // Create a new like
    await prisma.like.create({
      data: {
        user: {
          connect: { userId: userId }
        },
        bookReview: {
          connect: { reviewId: bookReviewId }
        }
      }
    });

    // Increment the like count
    await prisma.bookReview.update({
      where: { reviewId: bookReviewId },
      data: {
        likeCount: {
          increment: 1
        }
      }
    });

    return "Liked Succ..."
  } catch (error:any) {
    console.error('Error adding like:', error);
    return  "Issue In Adding Like";
  }
};




export const deleteLike = async (parent:any, args:any) => {
  console.log(args);
    const { userId, bookReviewId } = args;
    // const userId="user_2hvUUtmGRMfjqzZHIh7TwLyWEaf";
    // const bookReviewId=1
    try {
      // Check if the like exists
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_bookReviewId: {
            userId: userId||"user_2hvUUtmGRMfjqzZHIh7TwLyWEaf",
            bookReviewId: bookReviewId||1
          }
        }
      });
  
      if (!existingLike) {
        return {
          success: false,
          message: 'Like not found'
        };
      }
  
      // Delete the like
      await prisma.like.delete({
        where: {
          userId_bookReviewId: {
            userId: userId,
            bookReviewId: bookReviewId
          }
        }
      });
  
      // Decrement the like count
      await prisma.bookReview.update({
        where: { reviewId: bookReviewId },
        data: {
          likeCount: {
            decrement: 1
          }
        }
      });
  
      return  "Remove Like Succ ..."
    } catch (error:any) {
      console.error('Error deleting like:');
      return " error in Remove Like Succ";
    }
  };



export const getBookReviewsLikedByUser = async (parent:any, args:any) => {
    const { userId } = args;
  
    try {
      const likes = await prisma.like.findMany({
        where: {
          userId: userId
        },
        include: {
          bookReview: true
        }
      });
  
      const bookReviews = likes.map(like => like.bookReview);
  
      return bookReviews;
    } catch (error) {
      console.error('Error fetching liked book reviews:', error);
return [];
    }
  };
  