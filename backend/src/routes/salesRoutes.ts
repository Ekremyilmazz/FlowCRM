import { Router } from 'express';
import { getAllSales, createSale } from '../controllers/salesController';

const router = Router();

router.get('/sales', getAllSales);
router.post('/sales', createSale);

export default router;