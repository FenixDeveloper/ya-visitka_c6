import { Router } from 'express';

import curatorGuard from '../middlewares/curatorGuard';
import { deleteComment, getComments } from '../controllers/comments';
import { isGetCommentValid, isCommentIdValid } from '../validators/comment';

const router = Router();

router.use(curatorGuard);
router.get('/', isGetCommentValid, getComments);
router.delete('/:commentId', isCommentIdValid, deleteComment);

export default router;
