import 'isomorphic-fetch';
import * as dotenv from 'dotenv';

import { PROFILE_URL, TOKEN_URL } from '../constants';

dotenv.config();

const { CLIENT_SECRET = '', CLIENT_ID = '' } = process.env;

export const fetchWithRetry = async (
  url: string,
  // eslint-disable-next-line no-undef
  options: RequestInit,
  retry: number = 1,
): Promise<any> => {
  try {
    return await fetch(url, options);
  } catch (error) {
    if (retry < 1) throw error;
    return fetchWithRetry(url, options, retry - 1);
  }
};

export const getAccessToken = async (code: string) => {
  const response = await fetchWithRetry(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const getUserJwtToken = async (accessToken: string) => {
  const response = await fetchWithRetry(PROFILE_URL, {
    headers: { Authorization: `OAuth ${accessToken}` },
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.text();
};
