import { Router } from 'express';
import { getComments } from '../controllers/comments';

const router = Router();

router.get('/', getComments);

export default router;
