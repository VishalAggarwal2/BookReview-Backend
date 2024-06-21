import prisma from "../../Client/PrismaClient"

export const addComment = async (parent:any, args:any) => {
  const { message, bookReviewId, userId } = args;
  if(!userId||!bookReviewId){
    return "Issue In Adding Comment"
  }

  try {
    // Create a new comment
    const newComment = await prisma.comment.create({
      data: {
        message,
        bookReview: {
          connect: { reviewId: bookReviewId }
        },
        user: {
          connect: { userId: userId }
        }
      }
    });

    return "Comment Added Succc....";
  } catch (error:any) {
    return "Issue In Adding The Comment";
  }
};


export const getParticularBookReviewComment = async (parent:any, args:any) => {
    const { bookReviewId } = args;
  
    try {
      // Fetch comments for the particular book review
      const comments = await prisma.comment.findMany({
        where: {
          bookReviewId: bookReviewId
        },
        include: {
          user: true, // Include the user who made the comment
          bookReview: true // Optionally include the book review details
        }
      });
  
      return comments;
    } catch (error:any) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };



  export const getUserComment=async(ctx:any)=>{
    try{
      const uid= ctx.userId;
       if(!uid){
        return null;
       }
  const  user = await prisma.user.findUnique({where:{userId:uid}});
  return user;
    }catch(e){
console.log("error in geting user");
return null;
    }

  }