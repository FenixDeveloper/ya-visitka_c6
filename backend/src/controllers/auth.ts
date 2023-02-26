import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';

import InternalServerError from '../errors/InternalServerError';
import { MSG_SERVER_ERROR } from '../constants';

dotenv.config();

export const yandexAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.user?.token;
  if (token) {
    res.send({ token });
  } else {
    next(new InternalServerError(MSG_SERVER_ERROR));
  }
};

export const jwtAuth = (req: Request, res: Response) => {
  const user = req.session.passport;
  res.send(user);
};
