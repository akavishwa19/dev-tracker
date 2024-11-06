import { Request } from 'express';

export interface UpdateSettingsRequest extends Request {
  params: {
    userId: string;
  };
  body: {
    theme?: string;
    emailNotifications?: boolean;
    taskReminders?: boolean;
  };
}

export interface GetSettingsRequest extends Request {
  params: {
    userId: string;
  };
}

export interface UpdateProfileSettingRequest extends Request {
  body: {
    name: string;
    email: string;
  };
}

export interface UpdateNotificationSettingRequest {
    emailNotifications: boolean;
    taskReminders: boolean;
}

export interface UpdateThemeSettingRequest {

    theme: string

}