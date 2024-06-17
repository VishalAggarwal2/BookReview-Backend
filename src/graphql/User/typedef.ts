const userType = `#graphql
type User {
  userId: String!
  firstName: String
  email: String!
  imageUrl: String
  bookReviews: [BookReview!]!
}
`

export default userType;