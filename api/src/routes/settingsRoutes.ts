import express, { NextFunction, Response } from 'express';
import { updateSettingsController, getSettingsController, updateProfileController, UpdateNotificationSettings, UpdateThemeSettings } from '../controllers/settingsController';
import { UpdateSettingsRequest, GetSettingsRequest, UpdateProfileSettingRequest, UpdateNotificationSettingRequest, UpdateThemeSettingRequest } from '../types/settingsTypes';
import { validateToken } from '../middlewares/authMiddleware';
import { updateNotificationSettings, updateThemeSettings } from '../services/settingsService';

const router = express.Router();

router.get('/', validateToken, (req: GetSettingsRequest, res: Response, next: NextFunction) => getSettingsController(req, res, next));
router.put('/:userId', (req: UpdateSettingsRequest, res: Response, next: NextFunction) => updateSettingsController(req, res, next));
router.put('/user/profile', validateToken, (req: UpdateProfileSettingRequest, res: Response, next: NextFunction) => updateProfileController(req, res, next));
router.put('/user/notification', validateToken, (req: UpdateNotificationSettingRequest, res: Response, next: NextFunction) => UpdateNotificationSettings(req, res, next));
router.put('/user/theme', validateToken, (req: UpdateThemeSettingRequest, res: Response, next: NextFunction) => UpdateThemeSettings(req, res, next));
export default router;
