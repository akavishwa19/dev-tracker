import { Request } from 'express';

export interface CreateActivityRequest extends Request {
  body: {
    description: string;
    userId: string;
    todoId?: string;
  };
}

export interface GetActivitiesRequest extends Request {
  params: {
    userId: string;
  };
}
