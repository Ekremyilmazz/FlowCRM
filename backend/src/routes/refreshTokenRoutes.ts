import { Router } from 'express';
import { refreshToken } from '../controllers/authController';

const router = Router();

router.post('/refresh-token', refreshToken);

export default router;