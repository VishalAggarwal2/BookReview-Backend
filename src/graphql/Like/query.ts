export const LikeQuey=`
addLike(userId:String,bookReviewId:String):String!
deleteLike(userId:String,bookReviewId:String):String!
getBookReviewsLikedByUser(userId:String):[BookReview]
`