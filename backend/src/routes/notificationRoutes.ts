import { Router } from 'express';
import { getNotificationsByUser, createNotification } from '../controllers/notificationController';

const router = Router();

router.get('/notifications/:userId', getNotificationsByUser);
router.post('/notifications', createNotification);

export default router;
