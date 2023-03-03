import multer, { MulterError } from 'multer';
import { NextFunction, Request, Response } from 'express';
import { DEFAULT_TEMP_DIR } from '../constants';
import BadRequestError from '../errors/BadRequestError';

const upload = multer({ dest: DEFAULT_TEMP_DIR }).single('file');

const uploadMiddlware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof MulterError) {
      next(new BadRequestError(String(err)));
    } else {
      next();
    }
  });
};

export default uploadMiddlware;
