"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookReviewInputType = void 0;
exports.bookReviewInputType = `#graphql
input BookReviewInput {
  bookName: String!
  bookDsc: String!
  bookType: String!
  bookReview: String!
  bookImageUrl: String
  presentAtLibrary: Boolean
  referenceNumber: String
  userId:String!
}
`;
