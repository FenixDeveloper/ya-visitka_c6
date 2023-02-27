/* eslint-disable camelcase */
import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import 'isomorphic-fetch';

import {
  ERR_CLIENT_NOT_FOUND,
  ERR_INVALID_CLIENT,
  ERR_INVALID_GRANT,
  MSG_CLIENT_NOT_FOUND,
  MSG_EXPIRED_CODE,
  MSG_SERVER_ERROR,
  MSG_WRONG_CLIENT_SECRET,
  PROFILE_URL,
  TOKEN_URL,
} from '../constants';
import InternalServerError from '../errors/InternalServerError';
import BadRequestError from '../errors/BadRequestError';

dotenv.config();

const { CLIENT_SECRET = '' } = process.env;

const yandexAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, client_id } = req.body;

    if (code && client_id) {
      const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id,
          client_secret: CLIENT_SECRET,
        }),
      });

      if (!response.ok) {
        const error = await response.json();

        if (error.error === ERR_INVALID_GRANT) {
          throw new BadRequestError(MSG_EXPIRED_CODE);
        }

        if (error.error === ERR_INVALID_CLIENT) {
          // eslint-disable-next-line operator-linebreak
          const message =
            error.error_description === ERR_CLIENT_NOT_FOUND
              ? MSG_CLIENT_NOT_FOUND
              : MSG_WRONG_CLIENT_SECRET;
          throw new BadRequestError(message);
        }
      }

      const { access_token } = await response.json();

      if (!access_token) {
        throw new InternalServerError(MSG_SERVER_ERROR);
      }

      const userResponse = await fetch(PROFILE_URL, {
        headers: { Authorization: `OAuth ${access_token}` },
      });

      const userJwt = await userResponse.text();

      req.user = { token: userJwt };

      next();
    } else {
      throw new InternalServerError(MSG_SERVER_ERROR);
    }
  } catch (err) {
    next(err);
  }
};

export default yandexAuthMiddleware;
