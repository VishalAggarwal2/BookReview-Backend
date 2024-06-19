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
exports.isInLibraryTeam = exports.updateUser = void 0;
const PrismaClient_1 = __importDefault(require("../../Client/PrismaClient"));
const updateUser = (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { user }) {
    console.log("hello from update user", user);
    if (!user.userId) {
        return "User ID not found";
    }
    const isExist = yield PrismaClient_1.default.user.findUnique({ where: { userId: user.userId } });
    if (isExist) {
        return "User already exists";
    }
    else {
        yield PrismaClient_1.default.user.create({
            data: {
                userId: user.userId,
                firstName: user.firstName || "",
                email: user.email,
                imageUrl: user.imageUrl,
            },
        });
        return "User created successfully";
    }
});
exports.updateUser = updateUser;
// check weather isInLibraryTeam
const isInLibraryTeam = (ctx, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const userId = data.userId;
        const user = yield PrismaClient_1.default.libraryTeam.findMany({
            where: {
                userId: userId // Provide userId directly to 'where' clause
            }
        });
        console.log(user);
        if (user[0]) {
            // User is in the library team
            return true;
        }
        else {
            // User is not in the library team
            return false;
        }
    }
    catch (e) {
        console.error("Error checking if user is in library team:", e);
        throw new Error("Failed to check user's library team status");
        return false;
    }
});
exports.isInLibraryTeam = isInLibraryTeam;
