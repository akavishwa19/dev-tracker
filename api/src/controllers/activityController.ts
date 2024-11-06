import { Request, Response } from 'express';
import * as activityService from '../services/activityService';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { catchAsync } from '../utils/errorHandler';

export const createActivityController = catchAsync(async (req: Request, res: Response) => {
  const activity = await activityService.createActivity(req.body);
  sendSuccess(res, activity, 'Activity created successfully');
});

export const getActivitiesController = catchAsync(async (req: Request, res: Response) => {
  const activities = await activityService.getActivitiesByUser(req.params.userId as string);
  sendSuccess(res, activities, 'Activities retrieved successfully');
});
