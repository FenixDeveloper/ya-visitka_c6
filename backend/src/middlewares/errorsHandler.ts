import { NextFunction, Request, Response } from 'express';
import IErrors from '../errors';
import { HTTP_STATUS_SERVER_ERROR, MSG_SERVER_ERROR } from "../constants";

const errorHandler = (
  error: IErrors,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.statusCode || HTTP_STATUS_SERVER_ERROR;
  const message =
    status === HTTP_STATUS_SERVER_ERROR ? MSG_SERVER_ERROR : error.message;

  res.status(status).send({ message });
};

export default errorHandler;
