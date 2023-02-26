import { NextFunction, Request, Response } from 'express';
import IErrors from '../errors';
import { HTTP_STATUS_SERVER_ERROR, MSG_SERVER_ERROR } from '../constants';

const errorHandler = (
  error: IErrors,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = HTTP_STATUS_SERVER_ERROR, message } = error;
  res.status(statusCode).send(
    { error: statusCode === HTTP_STATUS_SERVER_ERROR ? MSG_SERVER_ERROR : message },
  );
  next();
};

export default errorHandler;
