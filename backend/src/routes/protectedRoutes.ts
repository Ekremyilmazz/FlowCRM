import {Router} from 'express';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: `Hoşgeldin, ${req.user?.name}`,
        user: req.user,
    });
});

export default router;