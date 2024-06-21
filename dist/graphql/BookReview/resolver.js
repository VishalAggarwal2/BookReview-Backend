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
exports.booKReviewByUserFunction = exports.allBookReview = exports.allBookReviewByUserId = exports.addBookReview = void 0;
const PrismaClient_1 = __importDefault(require("../../Client/PrismaClient"));
const addBookReview = (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { bookReviewInput }) {
    try {
        console.log("called");
        console.log(bookReviewInput);
        const createdReview = yield PrismaClient_1.default.bookReview.create({
            data: {
                bookName: bookReviewInput.bookName,
                bookDsc: bookReviewInput.bookDsc,
                bookType: bookReviewInput.bookType,
                presentAtLibrary: bookReviewInput.presentAtLibrary || false,
                bookImageUrl: bookReviewInput.bookImageUrl || "",
                referenceNumber: bookReviewInput.referenceNumber || null,
                bookReview: bookReviewInput.bookReview,
                userId: bookReviewInput.userId,
                bookReviewByLcMember: false, // Assuming default value
                isValidated: false, // Assuming default value
                isRejected: false // Assuming default value
            }
        });
        return "Book review added successfully";
    }
    catch (error) {
        console.error("Error adding book review:", error);
        return "Failed to add book review";
    }
});
exports.addBookReview = addBookReview;
const allBookReviewByUserId = (ctx_2, _b) => __awaiter(void 0, [ctx_2, _b], void 0, function* (ctx, { userId }) {
    console.log("come here");
    try {
        if (!userId) {
            console.log("come here");
            return [];
        }
        else {
            const allBookReview = yield PrismaClient_1.default.bookReview.findMany({ where: { userId: userId } });
            return allBookReview;
        }
    }
    catch (e) {
        return [];
    }
});
exports.allBookReviewByUserId = allBookReviewByUserId;
// all valid Book Review
const allBookReview = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("come here ...");
        const allBookReview = yield PrismaClient_1.default.bookReview.findMany({ where: { isValidated: true } });
        console.log(allBookReview);
        return allBookReview;
    }
    catch (e) {
        return [];
    }
});
exports.allBookReview = allBookReview;
const booKReviewByUserFunction = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = ctx;
        console.log(userId);
        if (!userId) {
            return null;
        }
        else {
            const userreview = yield PrismaClient_1.default.user.findUnique({
                where: {
                    userId: userId
                }
            });
            console.log(userreview);
            return userreview;
        }
    }
    catch (e) {
        console.log("error in finding user");
        return null;
    }
});
exports.booKReviewByUserFunction = booKReviewByUserFunction;
