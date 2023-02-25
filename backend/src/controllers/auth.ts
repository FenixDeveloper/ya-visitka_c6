import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

import InternalServerError from '../errors/InternalServerError';
import { HTTP_STATUS_SERVER_ERROR, MSG_SERVER_ERROR } from '../constants';

dotenv.config();

export const yandexAuth = (req: Request, res: Response) => {
  const token = req.user?.token;
  if (token) {
    res.send({ token });
  } else {
    res
      .status(HTTP_STATUS_SERVER_ERROR)
      .send(new InternalServerError(MSG_SERVER_ERROR));
  }
};

export const jwtAuth = (req: Request, res: Response) => {
  const user = req.session.passport;
  res.send(user);
};
