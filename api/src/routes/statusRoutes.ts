import express, { NextFunction, Request, Response } from "express";
import { getStatusesController } from "../controllers/statusController";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) =>
  getStatusesController(req, res, next),
);

export default router;
