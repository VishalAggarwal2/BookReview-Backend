"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const typedef_1 = __importDefault(require("../graphql/User/typedef"));
const query_1 = require("../graphql/User/query");
const resolver_1 = require("../graphql/User/resolver");
const typedef_2 = __importDefault(require("../graphql/BookReview/typedef"));
const Input_1 = __importDefault(require("../graphql/User/Input"));
const bookReviewInput_1 = require("../graphql/BookReview/bookReviewInput");
const query_2 = require("../graphql/BookReview/query");
const resolver_2 = require("../graphql/BookReview/resolver");
const cors_1 = __importDefault(require("cors"));
const query_3 = require("../graphql/LibraryTeam/query");
const resolver_3 = require("../graphql/LibraryTeam/resolver");
const TypeDef_1 = require("../graphql/Comment/TypeDef");
const Query_1 = require("../graphql/Comment/Query");
const Resolver_1 = require("../graphql/Comment/Resolver");
const query_4 = require("../graphql/Like/query");
const resolver_4 = require("../graphql/Like/resolver");
const initiateServe = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    const typeDefs = `
        
            ${typedef_1.default}
            ${typedef_2.default}
            ${Input_1.default}
            ${bookReviewInput_1.bookReviewInputType}
            ${TypeDef_1.commentType}
            type Query {
            hello: String
            ${query_1.userQuery}
            ${query_2.bookQuery}
            ${query_3.LibraryTeamQuery}
            ${Query_1.commentQuery}
            ${query_4.LikeQuey}
        }
    `;
    const resolvers = {
        Query: {
            hello: () => "Hello from the backend!",
            updateUser: resolver_1.updateUser,
            addBookReview: resolver_2.addBookReview,
            allBookReviewByUserId: resolver_2.allBookReviewByUserId,
            allBookReview: resolver_2.allBookReview,
            allInValidBookReview: resolver_3.allInValidBookReview,
            InvalidtoValidBookReview: resolver_3.InvalidtoValidBookReview,
            isInLibraryTeam: resolver_1.isInLibraryTeam,
            addComment: Resolver_1.addComment,
            getParticularBookReviewComment: Resolver_1.getParticularBookReviewComment,
            addLike: resolver_4.addLike,
            deleteLike: resolver_4.deleteLike,
            getBookReviewsLikedByUser: resolver_4.getBookReviewsLikedByUser
        }
    };
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    yield server.start();
    const middleware = (0, express4_1.expressMiddleware)(server);
    app.use("/graphql", middleware);
    app.get("/", (req, res) => {
        res.send("hello");
    });
    return app;
});
exports.default = initiateServe;
