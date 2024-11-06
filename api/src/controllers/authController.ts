import { Request, Response } from "express";
import * as authService from "../services/authService";
import * as userService from "../services/userService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { catchAsync } from "../utils/errorHandler";
import * as jwtHelper from "../utils/jwtHelper";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return sendError(res, "Email, password, and name are required", 400);
  }

  if (await userService.checkUserExists(email)) {
    return sendError(res, "User with this email already exists", 400);
  }

  const newUser = await authService.signUpUser({ email, password, name });
  return sendSuccess(
    res,
    { id: newUser.id, email: newUser.email, name: newUser.name },
    "User registered successfully",
  );
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, "Email and password are required", 400);
  }

  const user = await authService.loginUser({ email, password });
  const token = jwtHelper.generateJWTToken(user.id, user.email);

  sendSuccess(
    res,
    { token, user: { id: user.id, email: user.email, name: user.name } },
    "User logged in successfully",
  );
});

export const validate = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    return sendError(res, "Unauthorized", 401);
  }
  const user = await authService.validateUser(req.userId);
  sendSuccess(res, user, "User validated successfully");
});