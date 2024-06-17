export interface BookReviewInputInterface {
    bookName: string;
    bookDsc: string;
    bookType: string;
    bookReview: string;
    bookImageUrl?: string;
    presentAtLibrary: boolean;
    referenceNumber?: string | null;
    userId:string;
}
