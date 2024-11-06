import { login, signUp, validate } from "../controllers/authController";
import { validateToken } from "../middlewares/authMiddleware";
import { LoginRequest, SignupRequest } from "../types/authTypes";
import express, { NextFunction, Response, Request } from "express";

const router = express.Router();

router.post("/signup", (req: SignupRequest, res: Response, next: NextFunction) =>
  signUp(req, res, next),
);
router.post("/login", (req: LoginRequest, res: Response, next: NextFunction) =>
  login(req, res, next),
);

router.get("/validate", validateToken, (req: Request, res: Response, next: NextFunction) =>
  validate(req, res, next),
);

export default router;
