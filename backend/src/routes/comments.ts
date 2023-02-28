import { Router } from 'express';
import { deleteComment, getComments } from '../controllers/comments';
import { isCommentIdValid } from '../validators/comment';
import curatorGuard from '../middlewares/curatorGuard';

const router = Router();

router.use(curatorGuard);
router.get('/', getComments);
router.delete('/:commentId', isCommentIdValid, deleteComment);

export default router;
