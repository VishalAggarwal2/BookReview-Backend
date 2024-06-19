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
exports.getBookReviewsLikedByUser = exports.deleteLike = exports.addLike = void 0;
const PrismaClient_1 = __importDefault(require("../../Client/PrismaClient"));
const addLike = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookReviewId } = args;
    try {
        // Create a new like
        yield PrismaClient_1.default.like.create({
            data: {
                user: {
                    connect: { userId: userId }
                },
                bookReview: {
                    connect: { reviewId: bookReviewId }
                }
            }
        });
        // Increment the like count
        yield PrismaClient_1.default.bookReview.update({
            where: { reviewId: bookReviewId },
            data: {
                likeCount: {
                    increment: 1
                }
            }
        });
        return "Liked Succ...";
    }
    catch (error) {
        console.error('Error adding like:', error);
        return "Issue In Adding Like";
    }
});
exports.addLike = addLike;
const deleteLike = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookReviewId } = args;
    try {
        // Check if the like exists
        const existingLike = yield PrismaClient_1.default.like.findUnique({
            where: {
                userId_bookReviewId: {
                    userId: userId,
                    bookReviewId: bookReviewId
                }
            }
        });
        if (!existingLike) {
            return {
                success: false,
                message: 'Like not found'
            };
        }
        // Delete the like
        yield PrismaClient_1.default.like.delete({
            where: {
                userId_bookReviewId: {
                    userId: userId,
                    bookReviewId: bookReviewId
                }
            }
        });
        // Decrement the like count
        yield PrismaClient_1.default.bookReview.update({
            where: { reviewId: bookReviewId },
            data: {
                likeCount: {
                    decrement: 1
                }
            }
        });
        return "Remove Like Succ ...";
    }
    catch (error) {
        console.error('Error deleting like:', error);
        return "Remove Like Succ";
    }
});
exports.deleteLike = deleteLike;
const getBookReviewsLikedByUser = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = args;
    try {
        const likes = yield PrismaClient_1.default.like.findMany({
            where: {
                userId: userId
            },
            include: {
                bookReview: true
            }
        });
        const bookReviews = likes.map(like => like.bookReview);
        return bookReviews;
    }
    catch (error) {
        console.error('Error fetching liked book reviews:', error);
        return [];
    }
});
exports.getBookReviewsLikedByUser = getBookReviewsLikedByUser;
