import express, { NextFunction, Response } from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { CreateTaskRequest, GetTasksRequest } from "../types/taskTypes";

const router = express.Router();

router.post("/", (req: CreateTaskRequest, res: Response, next: NextFunction) =>
  createTask(req, res, next),
);
router.get("/:userId", (req: GetTasksRequest, res: Response, next: NextFunction) =>
  getTasks(req, res, next),
);

export default router;
