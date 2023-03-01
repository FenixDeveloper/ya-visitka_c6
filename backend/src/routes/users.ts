import { Router } from 'express';
import { createUser, putUser, searchUsers } from '../controllers/users';
import { isPostUserValid, isPutUserValid, isSearchUserValid } from '../validators/user';
import curatorGuard from '../middlewares/curatorGuard';

const router = Router();

router.use(curatorGuard);
router.post('/', isPostUserValid, createUser);
router.get('/', isSearchUserValid, searchUsers);
router.put('/:userId', isPutUserValid, putUser);

export default router;
