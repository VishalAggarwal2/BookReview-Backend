const bookReviewtype = `#graphql
type BookReview {
  reviewId: Int!
  bookName: String!
  bookDsc: String!
  bookType: String!
  bookImageUrl: String!
  presentAtLibrary: Boolean!
  referenceNumber: String
  bookReviewByLcMember: Boolean!
  isValidated: Boolean!
  isRejected: Boolean!
  user: User!
}
`

export default bookReviewtype;