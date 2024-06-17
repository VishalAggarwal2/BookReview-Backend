export const bookQuery=`#graphql
addBookReview(bookReviewInput: BookReviewInput): String!
allBookReviewByUserId(userId:String):[BookReview]
allBookReview:[BookReview]
`