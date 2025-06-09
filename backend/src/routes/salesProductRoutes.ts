import { Router } from 'express';
import { getAllSalesProducts, addProductToSale } from '../controllers/salesProductController';

const router = Router();

router.get('/sales-products', getAllSalesProducts);
router.post('/sales-products', addProductToSale);

export default router;