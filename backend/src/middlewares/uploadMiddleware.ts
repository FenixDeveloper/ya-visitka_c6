import multer, { MulterError } from 'multer';
import { NextFunction, Request, Response } from 'express';
import { DEFAULT_TEMP_DIR } from '../constants';
import BadRequestError from '../errors/BadRequestError';

const upload = multer({ dest: DEFAULT_TEMP_DIR })
  .fields([
    { name: 'hobby', maxCount: 1 },
    { name: 'status', maxCount: 1 },
    { name: 'job', maxCount: 1 },
    { name: 'edu', maxCount: 1 }]);

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof MulterError) {
      next(new BadRequestError(String(err)));
    } else {
      next();
    }
  });
};

export default uploadMiddleware;
