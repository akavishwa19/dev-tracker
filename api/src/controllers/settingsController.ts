import { Request, Response } from 'express';
import * as settingsService from '../services/settingsService';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { catchAsync } from '../utils/errorHandler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const getSettingsController = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const settings = await settingsService.getSettingsByUserId(req.userId as string);
  sendSuccess(res, settings, 'Settings retrieved successfully');
});

export const updateSettingsController = catchAsync(async (req: Request, res: Response) => {
  const updatedSettings = await settingsService.updateSettings(req.params.userId as string, req.body);
  sendSuccess(res, updatedSettings, 'Settings updated successfully');
});

export const updateProfileController = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const updatedProfile = await settingsService.updateProfile(req.userId, req.body);
  sendSuccess(res, updatedProfile, 'Profile updated successfully');
});

export const UpdateNotificationSettings = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const updatedNotificationSettings = await settingsService.updateNotificationSettings(req.userId, req);
  sendSuccess(res, updatedNotificationSettings, 'Notification settings updated successfully');
})

export const UpdateThemeSettings = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const updatedThemeSettings = await settingsService.updateThemeSettings(req.userId, req);
  sendSuccess(res, updatedThemeSettings, 'Theme settings updated successfully')
})