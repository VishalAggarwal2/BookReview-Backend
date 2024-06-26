"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
  userId: String
  isRejected: Boolean!
  likeCount:Int
  user: User!
}
`;
exports.default = bookReviewtype;
