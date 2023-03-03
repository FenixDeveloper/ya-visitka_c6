/* eslint-disable no-unused-vars */
import { Request, Response, Express } from 'express';
import { TInfoType } from '../types/info-block';

type TFiles = {[key in TInfoType]: Express.Multer.File[];}

type TResult = {[key in TInfoType]?: {file: string}}

const uploadFiles = (
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

export default uploadFiles;
