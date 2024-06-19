"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentType = void 0;
exports.commentType = `
type Comment {
    id: Int!
    message: String!
    bookReviewId: Int!
    userId: String!
    bookReview: BookReview!
    user: User!
  }
`;
