import express from 'express';
import { createActivityController, getActivitiesController } from '../controllers/activityController';
import { CreateActivityRequest, GetActivitiesRequest } from '../types/activityTypes';

const router = express.Router();

router.post('/', (req: CreateActivityRequest, res, next) => createActivityController(req, res, next));
router.get('/:userId', (req: GetActivitiesRequest, res, next) => getActivitiesController(req, res, next));

export default router;
