"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentQuery = void 0;
exports.commentQuery = `
addComment(message:String,bookReviewId:String,userId:String):String!
getParticularBookReviewComment(bookReviewId:String):[Comment]
`;
