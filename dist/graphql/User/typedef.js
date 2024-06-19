"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userType = `#graphql
type User {
  userId: String!
  firstName: String
  email: String!
  imageUrl: String
  bookReviews: [BookReview!]!
}
`;
exports.default = userType;
