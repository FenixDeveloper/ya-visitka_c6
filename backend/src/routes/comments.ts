import { Router } from 'express';
import { isGetCommentValid } from '../validators/comment';
import { getComments } from '../controllers/comments';

const router = Router();

router.get('/', isGetCommentValid, getComments);

export default router;
