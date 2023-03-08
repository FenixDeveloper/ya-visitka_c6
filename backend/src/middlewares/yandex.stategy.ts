/* eslint-disable camelcase */
import { NextFunction, Request, Response } from 'express';

import BadRequestError from '../errors/BadRequestError';
import InternalServerError from '../errors/InternalServerError';

import { getAccessToken, getUserJwtToken } from '../utils';

import {
  ERR_CLIENT_NOT_FOUND,
  ERR_INVALID_CLIENT,
  ERR_INVALID_GRANT,
  MSG_CLIENT_NOT_FOUND,
  MSG_EXPIRED_CODE,
  MSG_SERVER_ERROR,
  MSG_WRONG_CLIENT_SECRET,
} from '../constants';

const yandexAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code } = req.body;

    if (code) {
      const { access_token } = await getAccessToken(code);

      if (!access_token) {
        throw new InternalServerError(MSG_SERVER_ERROR);
      }

      const userJwtToken = await getUserJwtToken(access_token);

      req.user = { token: userJwtToken };

      next();
    } else {
      throw new InternalServerError(MSG_SERVER_ERROR);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    let sendingError = err;

    if (err.error === ERR_INVALID_GRANT) {
      sendingError = new BadRequestError(MSG_EXPIRED_CODE);
    }

    if (err.error === ERR_INVALID_CLIENT) {
      const message =
        err.error_description === ERR_CLIENT_NOT_FOUND
          ? MSG_CLIENT_NOT_FOUND
          : MSG_WRONG_CLIENT_SECRET;
      sendingError = new BadRequestError(message);
    }

    next(sendingError);
  }
};

export default yandexAuthMiddleware;
