import { NextFunction, Request, Response } from 'express';
import IErrors from '../errors/types';

// eslint-disable-next-line no-unused-vars
const errorHandler = (
  error: IErrors,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.statusCode || 500;
  const message =
    status === 500 ? 'На сервере произошла ошибка' : error.message;

  res.status(status).send({ message });
};

export default errorHandler;
