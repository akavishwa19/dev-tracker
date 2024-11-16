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


export const matchCurrentPassword = async (data: {
  userId: string;
  currentPassword: string;
}) => {
  //find authenticated user
  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  return user && (await bcrypt.compare(data.currentPassword, user.password));
};

export const resetPasswordUser = async (data: {
  userId: string;
  updatedPassword: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.updatedPassword, 10);

  //update user password with the new password
  const updatePassword = await prisma.user.update({
    where: { id: data.userId },
    data: {
      password: hashedPassword,
    },
  });
  return updatePassword;
};