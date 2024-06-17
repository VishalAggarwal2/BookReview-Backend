import prisma from "../../Client/PrismaClient";
import { UserInputInterface } from "./Interface";


export const updateUser = async (ctx: any, { user }: { user: UserInputInterface }) => {
    console.log("hello from update user", user);

    if (!user.userId) {
        return "User ID not found";
    }

    const isExist = await prisma.user.findUnique({ where: { userId: user.userId } });

    if (isExist) {
        return "User already exists";
    } else {
        await prisma.user.create({
            data: {
                userId: user.userId,
                firstName: user.firstName||"",
                email: user.email,
                imageUrl: user.imageUrl,
            },
        });

        return "User created successfully";
    }
};


// check weather isInLibraryTeam


export const isInLibraryTeam = async (ctx: any, data:any) => {
    try {
        console.log(data);
        const userId=data.userId;
      const user = await prisma.libraryTeam.findMany({
        where: {
          userId: userId // Provide userId directly to 'where' clause
        }
      });
      console.log(user);
      if (user[0]) {
        // User is in the library team
        return true;
      } else {
        // User is not in the library team
        return false;
      }
  
    } catch (e) {
      console.error("Error checking if user is in library team:", e);
      throw new Error("Failed to check user's library team status");
      return false;
    }
  };