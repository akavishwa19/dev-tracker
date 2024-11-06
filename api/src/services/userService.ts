import prisma from "../config/database";

export const checkUserExists = async (email: string) => !!(await getUserByEmail(email));

export const getUserByEmail = async (email: string) => prisma.user.findUnique({ where: { email } });

export const getUserById = async (userId: string) => prisma.user.findUnique({ where: { id: userId } });