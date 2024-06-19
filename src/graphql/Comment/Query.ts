export const commentQuery=`
addComment(message:String,bookReviewId:String,userId:String):String!
getParticularBookReviewComment(bookReviewId:String):[Comment]
`