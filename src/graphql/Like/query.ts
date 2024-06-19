export const LikeQuey=`
addLike(userId:String,bookReviewId:Int):String!
deleteLike(userId:String,bookReviewId:Int):String!
getBookReviewsLikedByUser(userId:String):[BookReview]
`