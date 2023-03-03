import { Router } from 'express';
import fs from 'fs';
import path from 'path';

import uploadMiddlware from '../middlewares/uploadMiddlware';
import { DEFAULT_UPLOAD_DIR, HTTP_STATUS_OK, MSG_USER_NOT_FOUND } from '../constants';
import BadRequestError from '../errors/BadRequestError';
import { isTypeInfoValid } from '../validators/info';
import User from '../models/user';
import DataNotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

const router = Router();

router.post('/file/:typeInfo', isTypeInfoValid, uploadMiddlware, async (req, res, next) => {
  const { typeInfo } = req.params;

  const userId = '63fa18611d40f033474ea841';

  console.log(typeInfo);
  console.log(JSON.stringify(req.file, undefined, 2));

  const uploadFile = req.file as {filename: string, destination: string};

  const { filename, destination } = uploadFile;

  // Обновление INFO

  try {
    const user = await User.findById(userId);

    if (!user) {
      next(new DataNotFoundError(MSG_USER_NOT_FOUND));
      return;
    }

    if (user.id !== userId) {
      next(new ForbiddenError());
      return;
    }

    const updatePath = `info.${typeInfo}.image`;

    let isError = false;
    User.findByIdAndUpdate(userId, { [updatePath]: filename }, { new: true })
      .then((updUser) => {
        res.status(HTTP_STATUS_OK).send(updUser);
      })
      .catch((err) => {
        isError = true;
        next(new BadRequestError(String(err)));
      });

    if (isError) return;

    // Копирование файла
    const dir = DEFAULT_UPLOAD_DIR;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const fromPath = path.resolve(destination, filename);
    const toPath = path.resolve(dir, filename);

    fs.renameSync(fromPath, toPath);

    return;
  } catch (err) {
    next(new DataNotFoundError(String(err)));
  }
});

router.get('/:fileId', (req, res, next) => {
  const { fileId } = req.params;

  const dir = DEFAULT_UPLOAD_DIR;
  const fullPath = path.resolve(dir, fileId);

  if (!fs.existsSync(fullPath)) {
    next(new BadRequestError('file not found'));
    return;
  }

  res.sendFile(fullPath, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fullPath);
    }
  });
});

export default router;
