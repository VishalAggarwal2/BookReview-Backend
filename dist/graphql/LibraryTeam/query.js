"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryTeamQuery = void 0;
exports.LibraryTeamQuery = `#graphql
allInValidBookReview: [BookReview]
InvalidtoValidBookReview(userId:String,reviewId:Int):String!
`;
