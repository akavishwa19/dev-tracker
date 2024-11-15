import { Request } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export interface CreateTaskRequest extends Request {
  body: {
    title: string;
    description?: string;
    priorityId: string;
    statusId: string;
    dueDate?: Date;
    tags?: string[];
    userId: string;
  };
}

export interface GetTasksRequest extends Request {
  params: {
    userId: string;
  };
}


export interface UpdateTaskStatusRequest extends AuthenticatedRequest {
  params: {
    taskId: string;
  };
  body: {
    statusId: string;
  };
}