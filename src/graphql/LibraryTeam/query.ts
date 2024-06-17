export const LibraryTeamQuery=`#graphql
allInValidBookReview: [BookReview]
InvalidtoValidBookReview(userId:String,reviewId:Int):String!
`