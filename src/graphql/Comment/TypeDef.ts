export const commentType=`
type Comment {
    id: Int!
    message: String!
    bookReviewId: Int!
    userId: String!
    bookReview: BookReview!
    user: User!
  }
`