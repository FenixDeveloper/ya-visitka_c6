import { Router } from 'express';
import {
  isGetCommentValid,
  isCommentIdValid,
} from '../validators/comment';
import { deleteComment, getComments } from '../controllers/comments';
import curatorGuard from '../middlewares/curatorGuard';

const router = Router();

router.use(curatorGuard);
router.get('/', isGetCommentValid, getComments);
router.delete('/:commentId', isCommentIdValid, deleteComment);

export default router;
