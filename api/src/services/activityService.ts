import prisma from '../config/database';

export const createActivity = async (data: any) => prisma.activity.create({ data });
export const getActivitiesByUser = async (userId: string) =>
  prisma.activity.findMany({ where: { userId }, include: { task: true } });
