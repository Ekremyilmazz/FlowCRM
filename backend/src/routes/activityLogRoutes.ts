import { Router } from 'express';
import { getActivityLogs, createActivityLog } from '../controllers/activityLogController';

const router = Router();

router.get('/activity-log', getActivityLogs);
router.post('/activity-log', createActivityLog);

export default router;
