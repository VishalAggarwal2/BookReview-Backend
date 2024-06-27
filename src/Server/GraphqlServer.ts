import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
import userType from "../graphql/User/typedef";
import { userQuery } from "../graphql/User/query";
import { isInLibraryTeam, updateUser } from "../graphql/User/resolver";
import bookReviewtype from "../graphql/BookReview/typedef";
import userInputType from "../graphql/User/Input";
import { bookReviewInputType } from "../graphql/BookReview/bookReviewInput";
import { bookQuery } from "../graphql/BookReview/query";
import { NotInLibrary, addBookReview, allBookReview, allBookReviewByUserId, getParticularBookReviewId } from "../graphql/BookReview/resolver";
import cors from 'cors'
import { LibraryTeamQuery } from "../graphql/LibraryTeam/query";
import { InvalidtoValidBookReview, allInValidBookReview } from "../graphql/LibraryTeam/resolver";
import { commentType } from "../graphql/Comment/TypeDef";
import { commentQuery } from "../graphql/Comment/Query";
import { addComment, getParticularBookReviewComment, getUserComment } from "../graphql/Comment/Resolver";
import { LikeQuey } from "../graphql/Like/query";
import { addLike, deleteLike, getBookReviewsLikedByUser } from "../graphql/Like/resolver";
import { booKReviewByUserFunction } from "../graphql/BookReview/resolver"; 
const initiateServe = async() => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    const typeDefs = `
        
            ${userType}
            ${bookReviewtype}
            ${userInputType}
            ${bookReviewInputType}
            ${commentType}
            type Query {
            hello: String
            ${userQuery}
            ${bookQuery}
            ${LibraryTeamQuery}
            ${commentQuery}
            ${LikeQuey}
        }
    `;

    const resolvers = {
        Query: {
            hello: () => "Hello from the backend!",
            updateUser:updateUser,
            addBookReview:addBookReview,
            allBookReviewByUserId:allBookReviewByUserId,
            allBookReview:allBookReview,
            allInValidBookReview:allInValidBookReview,
            InvalidtoValidBookReview:InvalidtoValidBookReview,
            isInLibraryTeam:isInLibraryTeam,
            addComment:addComment,
            getParticularBookReviewComment:getParticularBookReviewComment,
            addLike:addLike,
            deleteLike:deleteLike,
            getBookReviewsLikedByUser:getBookReviewsLikedByUser,
            getParticularBookReviewId:getParticularBookReviewId,
            NotInLibrary:NotInLibrary
        },
        BookReview:{
            user:booKReviewByUserFunction
        },
        Comment:{
            user:getUserComment
        }

    };
        const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    const middleware: any = expressMiddleware(server);

    app.use("/graphql", middleware);

    app.get("/", (req:any, res:any) => {
        res.send("hello");
    });

    return app;
}

export default initiateServe;
