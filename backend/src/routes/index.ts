import { Router } from 'express';

import profileRouter from './profiles';
import usersRouter from './users';
import commentsRouter from './comments';
import uploadRouter from './uploadFiles';

import { jwtAuth } from '../controllers/auth';

import DataNotFoundError from '../errors/NotFoundError';

const router = Router();

// Protected
router.get('/api/login', jwtAuth);

router.use('/api/users', usersRouter);
router.use('/api/profiles', profileRouter);
router.use('/api/files', uploadRouter);

router.use('/api/comments', commentsRouter);

// Не обрабатываемые маршруты
router.use((_req, _res, next) => {
  next(new DataNotFoundError('Маршрут не определен'));
});

export default router;
