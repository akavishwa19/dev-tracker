import { Response } from 'express';
import * as taskService from '../services/taskService';
import { sendSuccess } from '../utils/responseHandler';
import { catchAsync } from '../utils/errorHandler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { UpdateTaskStatusRequest } from '../types/taskTypes';

export const createTask = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;
  const task = await taskService.createTask(req.userId, req.body);
  sendSuccess(res, task, 'Task created successfully');
});

export const getTasks = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const tasks = await taskService.getTasksByUser(req.userId);
  sendSuccess(res, tasks, 'Tasks retrieved successfully');
});

export const updateTaskStatus = catchAsync(async (req: UpdateTaskStatusRequest, res: Response) => {
  const { taskId } = req.params;
  const { statusId } = req.body;
  const { userId } = req;

  if (!statusId) {
    return res.status(400).json({ message: 'Status ID is required' });
  }

  if(!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const updatedTask = await taskService.updateTaskStatus(req.userId as string, taskId, statusId);
  sendSuccess(res, updatedTask, 'Task status updated successfully');
});

export const updateTask = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const { taskId } = req.params;
  const updatedTask = await taskService.updateTask(req.userId, taskId, req.body);
  sendSuccess(res, updatedTask, 'Task updated successfully');
});

export const deleteTask = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const { taskId } = req.params;
  const result = await taskService.deleteTask(req.userId, taskId);
  sendSuccess(res, result, 'Task deleted successfully');
});