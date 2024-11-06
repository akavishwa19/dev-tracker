import { UpdateSettingsRequest } from "./../types/settingsTypes";
import {
  UpdateNotificationSettingRequest,
  UpdateProfileSettingRequest,
  UpdateThemeSettingRequest,
} from "../types/settingsTypes";
import prisma from "../config/database";

export const getSettingsByUserId = async (userId: string) =>
  prisma.settings.findUnique({ where: { userId } });

export const updateSettings = async (userId: string, data: any) =>
  prisma.settings.update({ where: { userId }, data });

export const updateProfile = async (userId: string, data:UpdateSettingsRequest) => {
  return prisma.user.update({ where: { id: userId }, data });
};

export const updateNotificationSettings = async (userId: string, data: UpdateNotificationSettingRequest) => {
  const userSettings = await getSettingsByUserId(userId);
  if (!userSettings) {
    throw new Error("User settings not found");
  }
  const updatedSettings = {
    ...userSettings,
    emailNotifications: data.emailNotifications,
    taskReminders: data.taskReminders,
  };
  return prisma.settings.update({ where: { userId }, data: updatedSettings });
};

export const updateThemeSettings = async (userId: string, data: UpdateThemeSettingRequest) => {
  const userSettings = await getSettingsByUserId(userId);
  if (!userSettings) {
    throw new Error("User settings not found");
  }
  const updatedSettings = {
    ...userSettings,
    theme: data.theme,
  };
  return prisma.settings.update({ where: { userId }, data: updatedSettings });
};
