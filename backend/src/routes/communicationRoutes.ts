import { Router } from 'express';
import { getAllCommunications, createCommunication } from '../controllers/communicationController';

const router = Router();

router.get('/communications', getAllCommunications);
router.post('/communications', createCommunication);

export default router;