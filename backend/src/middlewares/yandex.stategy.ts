/* eslint-disable camelcase */
import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';

import { MSG_SERVER_ERROR, PROFILE_URL, TOKEN_URL } from '../constants';
import InternalServerError from '../errors/InternalServerError';

dotenv.config();

const { CLIENT_ID = '', CLIENT_SECRET = '' } = process.env;

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
          client_id: client_id || CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
      });

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
      next(new InternalServerError(MSG_SERVER_ERROR));
    }
  } catch (err) {
    next(err);
  }
};

export default yandexAuthMiddleware;
