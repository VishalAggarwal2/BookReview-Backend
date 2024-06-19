export const commentQuery=`
addComment(message:String,bookReviewId:Int,userId:String):String!
getParticularBookReviewComment(bookReviewId:Int):[Comment]
`