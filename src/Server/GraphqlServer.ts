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
import { addBookReview, allBookReview, allBookReviewByUserId } from "../graphql/BookReview/resolver";
import cors from 'cors'
import { LibraryTeamQuery } from "../graphql/LibraryTeam/query";
import { InvalidtoValidBookReview, allInValidBookReview } from "../graphql/LibraryTeam/resolver";
const initiateServe = async() => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    const typeDefs = `
        
            ${userType}
            ${bookReviewtype}
            ${userInputType}
            ${bookReviewInputType}
      
            type Query {
            hello: String
            ${userQuery}
            ${bookQuery}
            ${LibraryTeamQuery}
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
        }
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    const middleware: any = expressMiddleware(server);

    app.use("/graphql", middleware);

    app.get("/", (req, res) => {
        res.send("hello");
    });

    return app;
}

export default initiateServe;
