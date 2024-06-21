"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeQuey = void 0;
exports.LikeQuey = `
addLike(userId:String,bookReviewId:Int):String!
deleteLike(userId:String,bookReviewId:Int):String!
getBookReviewsLikedByUser(userId:String):[BookReview]
`;
