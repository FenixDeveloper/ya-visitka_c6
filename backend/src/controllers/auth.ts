import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

import { OAUTH_URL } from '../constants';

dotenv.config();

const { CLIENT_ID = '', CALLBACK_URL } = process.env;

export const redirect = (req: Request, res: Response) => {
  const oauthURL = new URL(OAUTH_URL);
  oauthURL.searchParams.append('client_id', CLIENT_ID);

  if (CALLBACK_URL) {
    oauthURL.searchParams.append('redirect_uri', CALLBACK_URL);
  }

  res.redirect(oauthURL.toString());
};

export const yandexAuth = (req: Request, res: Response) => {
  res.setHeader('Authorization', `Bearer ${req.user?.token}`);
  res.send('done'); // ! ?????
};

export const jwtAuth = (req: Request, res: Response) => {
  res.send(req.user);
};
