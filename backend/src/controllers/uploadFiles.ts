/* eslint-disable no-unused-vars */
import {
  Request, Response, Express, NextFunction,
} from 'express';
import path from 'path';
import fs from 'fs';

import { TInfoType } from '../types/info-block';
import { DEFAULT_UPLOAD_DIR } from '../constants';
import BadRequestError from '../errors/BadRequestError';

type TFiles = {[key in TInfoType]: Express.Multer.File[];}

type TResult = {[key in TInfoType]?: {file: string}}

export const uploadFiles = (
  req: Request<{}, {}, {files: TFiles}>,
  res: Response,
) => {
  const files = req.files as TFiles;

  const result: TResult = Object
    .keys(files)
    .filter((k) => k)
    .map((key) => {
      const fileDescription = files[key as TInfoType][0];
      const filePath = `${fileDescription.destination}${fileDescription.filename}`;

      return {
        [key]: { file: filePath },
      };
    })[0];

  res.send(JSON.stringify(result, undefined, 2));
};

export const getFile = (
  req: Request<{file:string}>,
  res: Response,
  next: NextFunction,
) => {
  const { file } = req.params;
  const uploadDir = DEFAULT_UPLOAD_DIR;
  const pathFile = path.resolve(uploadDir, file);

  console.log(pathFile);

  if (!fs.existsSync(pathFile)) {
    next(new BadRequestError('Файл не существует'));
    return;
  }

  res.sendFile(pathFile);
};
