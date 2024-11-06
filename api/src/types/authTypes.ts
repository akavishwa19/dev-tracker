import { Request } from "express";

export interface SignupRequest extends Request {
  body: {
    email: string;
    password: string;
    name?: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
