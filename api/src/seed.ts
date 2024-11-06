import prisma from './config/database';

export async function seedData() {
  const priorities = ['low', 'medium', 'high'];
  const statuses = ['todo', 'in-progress', 'review', 'done'];

  // Check and Seed Priorities
  for (const priority of priorities) {
    await prisma.priority.upsert({
      where: { name: priority },
      update: {},
      create: { name: priority },
    });
  }

  // Check and Seed Statuses
  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status },
      update: {},
      create: { name: status },
    });
  }
}