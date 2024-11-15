import express, { NextFunction, Response, Request } from "express";
import { getPrioritiesController } from "../controllers/priorityController";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) =>
  getPrioritiesController(req, res, next),
);

export default router;
