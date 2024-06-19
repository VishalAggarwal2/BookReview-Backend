"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeQuey = void 0;
exports.LikeQuey = `
addLike(userId:String,bookReviewId:String):String!
deleteLike(userId:String,bookReviewId:String):String!
getBookReviewsLikedByUser(userId:String):[BookReview]
`;
