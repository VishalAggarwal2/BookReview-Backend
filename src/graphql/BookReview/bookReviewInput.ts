export const bookReviewInputType = `#graphql
input BookReviewInput {
  bookName: String!
  bookDsc: String!
  bookType: String!
  bookReview: String!
  bookImageUrl: String
  presentAtLibrary: Boolean!
  referenceNumber: String
  userId:String!
}
`;
