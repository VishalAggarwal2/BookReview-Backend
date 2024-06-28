import { BookReviewInputInterface } from "./bookReviewInputInterface";
import prisma from "../../Client/PrismaClient";
import { sendMailToLibraryTeam } from "../../Service/Mailer";
export const addBookReview=async(ctx:any,{bookReviewInput}:{bookReviewInput:BookReviewInputInterface})=>{
    try {
        console.log("called");
        console.log(bookReviewInput);
        const createdReview = await prisma.bookReview.create({
            data: {
                bookName:bookReviewInput.bookName,
                bookDsc:bookReviewInput.bookDsc,
                bookType:bookReviewInput.bookType,
                presentAtLibrary:bookReviewInput.presentAtLibrary||false,
                bookImageUrl:bookReviewInput.bookImageUrl||"",
                referenceNumber:bookReviewInput.referenceNumber||null,
                bookReview:bookReviewInput.bookReview,
                userId:bookReviewInput.userId,
                bookReviewByLcMember: false, // Assuming default value
                isValidated: false, // Assuming default value
                isRejected: false // Assuming default value
            }
        });
         sendMailToLibraryTeam(bookReviewInput);
        return "Book review added successfully";
    } catch (error) {
        console.error("Error adding book review:", error);
        return "Failed to add book review";
    }

}



export const allBookReviewByUserId=async(ctx:any,{userId}:{userId:string})=>{
    console.log("come here");   
try{

if(!userId){
    console.log("come here");
    return [];
}
else{

    const allBookReview = await prisma.bookReview.findMany({where:{userId:userId}});
    return allBookReview;
}
}catch(e:any) {
 return [];
}
}


// all valid Book Review
export const allBookReview =async(ctx:any)=>{
    try{
        console.log("come here ...")
const allBookReview =  await prisma.bookReview.findMany({where:{isValidated:true}});

console.log(allBookReview);
return allBookReview;
    }catch(e){
        console.log(e);
return [];
    }
}


export const booKReviewByUserFunction=async(ctx:any)=>{
try{
const {userId} = ctx;
console.log(userId);
if(!userId){
    return null;
}
else{
const userreview= await prisma.user.findUnique({
    where:{
        userId:userId
    }
})

console.log(userreview);
return userreview;
}



}catch(e){
    console.log("error in finding user");
    return null;

}

}


// get particular book

export const getParticularBookReviewId=async(ctx:any,data:any)=>{
try{
    console.log(data);
const reviewId= data.reviewId;
const bookReview = await prisma.bookReview.findUnique({where:{reviewId:reviewId}});
return bookReview;
}catch(e){
    return null;

}
}



// book not in library 
export const NotInLibrary=async()=>{
    console.log("called");
    try{
const bookNotInLibrary= await prisma.bookReview.findMany({where:{
    presentAtLibrary:false
}});

return bookNotInLibrary;
    }catch(e){
        console.log("issue in book not in library");
return [];
    }
}