import { Router } from 'express';

import profileRouter from './profile';
import usersRouter from './users';

import { jwtAuth } from '../controllers/auth';

const router = Router();

// Protected
router.get('/api/login', jwtAuth);

router.use('/api/users', usersRouter);
router.use('/api/profile', profileRouter);

export default router;
