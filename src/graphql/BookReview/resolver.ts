import { BookReviewInputInterface } from "./bookReviewInputInterface";
import prisma from "../../Client/PrismaClient";
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

        return "Book review added successfully";
    } catch (error) {
        console.error("Error adding book review:", error);
        return "Failed to add book review";
    }

}



export const allBookReviewByUserId=async(ctx:any,{userId}:{userId:string})=>{
try{
if(!userId){
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
const allBookReview =  await prisma.bookReview.findMany({where:{isValidated:true}});
console.log(allBookReview);
return allBookReview;
    }catch(e){
return [];
    }
}