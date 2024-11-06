import prisma from '../config/database';

export const createTask = async (data: any) => prisma.task.create({ data });
export const getTasksByUser = async (userId: string) => prisma.task.findMany({ where: { userId } });
