// src/utils/responseHandler.ts

import { Response } from "express";

export const sendSuccess = (res: Response, data: any, message: string = "Success") => {
  res.status(200).json({ success: true, message, data });
};

export const sendError = (res: Response, error: string, statusCode: number = 500) => {
  return res.status(statusCode).json({ success: false, message: error, statusCode: statusCode });
};
