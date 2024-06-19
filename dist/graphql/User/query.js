"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuery = void 0;
exports.userQuery = `#graphql
updateUser(user:UserInput):String!
isInLibraryTeam(userId:String):Boolean!
`;
