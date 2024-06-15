import initiateServe from "./Server/GraphqlServer";

const startServer=async()=>{
    const app = await initiateServe();
    app.listen(8000,()=>{
        console.log("Hello From The Typescript ");
    })
}
startServer();