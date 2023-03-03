import { Router } from 'express';

import uploadMiddlware from '../middlewares/uploadMiddlware';
import uploadFiles from '../controllers/uploadFiles';

const router = Router();

router.post('/file/', uploadMiddlware, uploadFiles);

export default router;
