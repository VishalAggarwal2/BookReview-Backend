export const LibraryTeamQuery=`#graphql
allInValidBookReview: [BookReview]
InvalidtoValidBookReview(userId:String,reviewId:Int):String!
allRejectedBookReviewsForUser:[BookReview]
rejectBookReview(userId:String,reviewId:Int,rejectionMessage:String):String!
`