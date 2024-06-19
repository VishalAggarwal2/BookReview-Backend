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
exports.rejectBookReview = exports.InvalidtoValidBookReview = exports.allInValidBookReview = void 0;
const PrismaClient_1 = __importDefault(require("../../Client/PrismaClient"));
const allInValidBookReview = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookReview = yield PrismaClient_1.default.bookReview.findMany({
            where: { isValidated: false }
        });
        console.log(allBookReview);
        return allBookReview;
    }
    catch (e) {
        console.error("Error fetching invalid book reviews:", e);
        return [];
    }
});
exports.allInValidBookReview = allInValidBookReview;
const InvalidtoValidBookReview = (ctx, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user is part of the library team
        console.log("*************************");
        console.log(data);
        const userId = data.userId;
        const reviewId = data.reviewId;
        const isLibraryTeam = yield PrismaClient_1.default.libraryTeam.findFirst({
            where: { userId: userId }
        });
        // If the user is not part of the library team, return an appropriate message
        if (!isLibraryTeam) {
            console.log(`User ${userId} is not part of the library team.`);
            return "Not Verified";
        }
        // Update the validity of the book review
        const updatedReview = yield PrismaClient_1.default.bookReview.update({
            where: { reviewId: reviewId },
            data: { isValidated: true }
        });
        console.log(updatedReview);
        return "Review Validated Succ.....";
        console.log("*************************");
    }
    catch (e) {
        console.log("*************************");
        return "An error occurred";
    }
});
exports.InvalidtoValidBookReview = InvalidtoValidBookReview;
const rejectBookReview = (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { data }) {
    try {
        const { userId, reviewId, rejectionMessage } = data;
        // Check if the user is part of the library team
        const isLibraryTeam = yield PrismaClient_1.default.libraryTeam.findFirst({
            where: { userId: userId }
        });
        // If the user is not part of the library team, return an appropriate message
        if (!isLibraryTeam) {
            console.log(`User ${userId} is not part of the library team.`);
            return "Not Authorized";
        }
        // Insert the rejection message into the RejectionMessage table
        const newRejectionMessage = yield PrismaClient_1.default.rejectionMessage.create({
            data: {
                message: rejectionMessage,
                bookReviewId: reviewId,
                libraryTeamId: isLibraryTeam.id,
            },
        });
        // Update the isRejected column of the BookReview table to true
        const updatedReview = yield PrismaClient_1.default.bookReview.update({
            where: { reviewId: reviewId },
            data: { isRejected: true },
        });
        console.log('Rejection Message:', newRejectionMessage);
        console.log('Updated Review:', updatedReview);
        return updatedReview;
    }
    catch (e) {
        console.error("Error rejecting book review:", e);
        return "An error occurred";
    }
});
exports.rejectBookReview = rejectBookReview;
