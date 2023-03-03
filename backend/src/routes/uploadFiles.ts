import { Router } from 'express';

import uploadMiddleware from '../middlewares/uploadMiddleware';
import uploadFiles from '../controllers/uploadFiles';

const router = Router();

router.post('/file/', uploadMiddleware, uploadFiles);

export default router;
