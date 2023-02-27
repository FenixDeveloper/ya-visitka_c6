import { Router } from 'express';

import profileRouter from './profile';
import commentsRouter from './comments';

import { jwtAuth } from '../controllers/auth';
import { getUsers } from '../controllers/users';

const router = Router();

// Protected
router.get('/api/login', jwtAuth);

router.use('/api/profile', profileRouter);

router.use('/api/comments', commentsRouter);

export default router;
