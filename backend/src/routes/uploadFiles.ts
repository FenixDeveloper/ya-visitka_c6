import { Router } from 'express';

import uploadMiddleware from '../middlewares/uploadMiddleware';
import { uploadFiles, getFile } from '../controllers/uploadFiles';

const router = Router();

router.post('/', uploadMiddleware, uploadFiles);
router.get('/:file', getFile);

export default router;
