import prisma from "../config/database";

export const getStatusesController = async (req: any, res: any, next: any) => {
  const statuses = await prisma.status.findMany();
  res.status(200).json({ success: true, data: statuses });
};
