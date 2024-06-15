import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import express from "express";

const initiateServe = async() => {
    const app = express();
    app.use(express.json());
    const typeDefs = `
        type Query {
            hello: String
        }
    `;

    const resolvers = {
        Query: {
            hello: () => "Hello from the backend!"
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
