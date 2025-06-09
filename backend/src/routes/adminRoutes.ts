import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get(
    '/dashboard',
    verifyToken,
    requireRole('admin'),
    (req, res) => {
        res.json({ message: 'Welcome to the admin dashboard!' });
    }
);

export default router;