import { Router } from 'express';
import { getAllNotes, createNote } from '../controllers/noteController';

const router = Router();

router.get('/notes', getAllNotes);
router.post('/notes', createNote);

export default router;
