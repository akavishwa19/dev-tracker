import prisma from "../config/database";
import { AppError } from "../utils/errorHandler";
import { Task } from "@prisma/client";

interface CreateTaskData {
  title: string;
  description?: string;
  priorityId: string;
  statusId: string;
  dueDate?: Date;
  tags?: string[];
}

const validateTaskData = async (data: CreateTaskData) => {
  if (!data.title?.trim()) {
    throw new AppError("Task title is required", 400);
  }

  // Validate priority exists
  const priority = await prisma.priority.findUnique({
    where: { id: data.priorityId },
  });
  if (!priority) {
    throw new AppError("Invalid priority", 400);
  }

  // Validate status exists
  const status = await prisma.status.findUnique({
    where: { id: data.statusId },
  });
  if (!status) {
    throw new AppError("Invalid status", 400);
  }

  // Validate due date
  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    throw new AppError("Due date cannot be in the past", 400);
  }
};

export const createTask = async (userId: string, taskData: CreateTaskData) => {
  await validateTaskData(taskData);

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Create the task
      const task = await prisma.task.create({
        data: {
          title: taskData.title,
          description: taskData.description as string,
          priorityId: taskData.priorityId as string,
          statusId: taskData.statusId as string,
          dueDate: taskData.dueDate as Date,
          tags: taskData.tags || [],
          userId: userId as string,
        },
        include: {
          priority: true,
          status: true,
        },
      });

      // Create the activity for task creation
      await prisma.activity.create({
        data: {
          description: `Task "${task.title}" created`,
          userId: userId,
          taskId: task.id,
        },
      });

      return task;
    });

    return result;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new AppError("Failed to create task", 500);
  }
};

export const getTasksByUser = async (userId: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      include: {
        priority: true,
        status: true,
        activities: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 5
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new AppError("Failed to fetch tasks", 500);
  }
};

export const updateTaskStatus = async (userId: string, taskId: string, statusId: string) => {
  try {
    // Verify task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId
      }
    });

    if (!existingTask) {
      throw new AppError("Task not found or unauthorized", 404);
    }

    // Verify status exists
    const status = await prisma.status.findUnique({
      where: { id: statusId }
    });

    if (!status) {
      throw new AppError("Invalid status", 400);
    }

    const result = await prisma.$transaction(async (prisma) => {
      // Update the task's status
      const task = await prisma.task.update({
        where: { id: taskId },
        data: {
          statusId,
          updatedAt: new Date()
        },
        include: {
          priority: true,
          status: true
        },
      });

      // Log the status change activity
      await prisma.activity.create({
        data: {
          description: `Task status updated to "${status.name}"`,
          userId,
          taskId,
        },
      });

      return task;
    });

    return result;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error updating task status:", error);
    throw new AppError("Failed to update task status", 500);
  }
};

export const updateTask = async (userId: string, taskId: string, updates: Partial<Task>) => {
  // Check if task exists and belongs to user
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: userId,
    },
  });

  if (!task) {
    throw new AppError("Task not found or unauthorized", 404);
  }

  // Validate priority and status if they are being updated
  if (updates.priorityId) {
    const priority = await prisma.priority.findUnique({
      where: { id: updates.priorityId },
    });
    if (!priority) {
      throw new AppError("Invalid priority", 400);
    }
  }

  if (updates.statusId) {
    const status = await prisma.status.findUnique({
      where: { id: updates.statusId },
    });
    if (!status) {
      throw new AppError("Invalid status", 400);
    }
  }

  // Update the task
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: updates.title as string,
      description: updates.description as string,
      priorityId: updates.priorityId as string,
      statusId: updates.statusId as string,
      dueDate: updates.dueDate as Date,
      tags: updates.tags || [],
      userId: userId as string,
    },
    include: {
      priority: true,
      status: true,
    },
  });

  return updatedTask;
};

export const deleteTask = async (userId: string, taskId: string) => {
  // Check if task exists and belongs to user
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: userId,
    },
  });

  if (!task) {
    throw new AppError("Task not found or unauthorized", 404);
  }

  // Delete the task
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return { success: true };
};
