import prisma from "../config/database";

export const getPrioritiesController = async (req: any, res: any, next: any) => {
  const priorities = await prisma.priority.findMany();
  res.status(200).json({ success: true, data: priorities });
};
