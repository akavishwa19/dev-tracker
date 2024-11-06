import { Request } from 'express';

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
