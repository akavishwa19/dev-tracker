import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { catchAsync } from '../utils/errorHandler';

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);
  sendSuccess(res, task, 'Task created successfully');
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const tasks = await taskService.getTasksByUser(req.params.userId as string);
  sendSuccess(res, tasks, 'Tasks retrieved successfully');
});
