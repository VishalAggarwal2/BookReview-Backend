"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookQuery = void 0;
exports.bookQuery = `#graphql
addBookReview(bookReviewInput: BookReviewInput): String!
allBookReviewByUserId(userId:String):[BookReview]
allBookReview:[BookReview]
`;
