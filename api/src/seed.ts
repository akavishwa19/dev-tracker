import prisma from './config/database';

export async function seedData() {
  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['Todo', 'In Progress', 'Review', 'Done'];

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