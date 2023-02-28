import { Router } from 'express';

import profileRouter from './profile';
import commentsRouter from './comments';
import authCurator from '../middlewares/authCurator';

import { jwtAuth } from '../controllers/auth';

const router = Router();

// Protected
router.get('/api/login', jwtAuth);

router.use('/api/profile', profileRouter);

router.use(authCurator);

router.use('/api/comments', commentsRouter);

export default router;
