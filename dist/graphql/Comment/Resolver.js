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
exports.getParticularBookReviewComment = exports.addComment = void 0;
const PrismaClient_1 = __importDefault(require("../../Client/PrismaClient"));
const addComment = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, bookReviewId, userId } = args;
    if (!userId || !bookReviewId) {
        return "Issue In Adding Comment";
    }
    try {
        // Create a new comment
        const newComment = yield PrismaClient_1.default.comment.create({
            data: {
                message,
                bookReview: {
                    connect: { reviewId: bookReviewId }
                },
                user: {
                    connect: { userId: userId }
                }
            }
        });
        return "Comment Added Succc....";
    }
    catch (error) {
        return "Issue In Adding The Comment";
    }
});
exports.addComment = addComment;
const getParticularBookReviewComment = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookReviewId } = args;
    try {
        // Fetch comments for the particular book review
        const comments = yield PrismaClient_1.default.comment.findMany({
            where: {
                bookReviewId: bookReviewId
            },
            include: {
                user: true, // Include the user who made the comment
                bookReview: true // Optionally include the book review details
            }
        });
        return comments;
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
});
exports.getParticularBookReviewComment = getParticularBookReviewComment;
