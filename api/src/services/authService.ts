import prisma from "../config/database";
import bcrypt from "bcrypt";

export const signUpUser = async (data: { email: string; password: string; name: string }) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      settings: {
        create: {
          theme: 'dark',
          emailNotifications: false,
          taskReminders: false
        }
      }
    },
  });
};

export const loginUser = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (user && (await bcrypt.compare(data.password, user.password))) {
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};

export const validateUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Invalid user");
  }
  const { email, name } = user;
  return {
    email,
    name,
    userId
  };
};
