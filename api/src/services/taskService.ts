import prisma from "../config/database";

// export const createTask = async (userId: string, data: any) => prisma.task.create({ data: { ...data, userId } });
export const getTasksByUser = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: { userId },
    include: { priority: true, status: true },
  });
  return tasks;
};

export const createTask = async (userId: string, taskData: any) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Create the task
      const task = await prisma.task.create({
        data: {
          title: taskData.title,
          description: taskData.description,
          priorityId: taskData.priorityId,
          statusId: taskData.statusId,
          dueDate: taskData.dueDate,
          tags: taskData.tags,
          userId: userId,
        },
      });

      // Create the activity for task creation
      const activity = await prisma.activity.create({
        data: {
          description: taskData.description,
          userId: userId,
          taskId: task.id,
        },
      });

      return { task, activity };
    });

    return result;
  } catch (error) {
    console.error("Error creating task and logging activity:", error);
    throw error;
  }
};

export const updateTaskStatus = async (userId: string, taskId: string, statusId: string) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Update the task's status
      const task = await prisma.task.update({
        where: { id: taskId },
        include: { priority: true, status: true },
        data: { statusId },
      });

      return { task };
    });

    return result;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};
