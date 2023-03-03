import 'isomorphic-fetch';
import * as dotenv from 'dotenv';

import { NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import {
  DEFAULT_TEMP_DIR, DEFAULT_UPLOAD_DIR, PROFILE_URL, TOKEN_URL,
} from '../constants';
import InternalServerError from '../errors/InternalServerError';

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

export const moveFileToUploads = (
  pathFile: string | null | undefined,
  next: NextFunction,
): string | null => {
  if (!pathFile) return null;

  if (!fs.existsSync(path.resolve(pathFile))) {
    // возможно он уже в uploads
    if (fs.existsSync(path.resolve(DEFAULT_UPLOAD_DIR, pathFile))) {
      return pathFile;
    }
    return null;
  }
  if (!pathFile.includes(DEFAULT_TEMP_DIR)) return pathFile;

  const fromPath = path.resolve(pathFile);

  const dirUpload = DEFAULT_UPLOAD_DIR;
  const fileName = pathFile.replace(DEFAULT_TEMP_DIR, '');
  const newPath = path.resolve(dirUpload, fileName);

  try {
    if (!fs.existsSync(dirUpload)) {
      fs.mkdirSync(dirUpload);
    }

    fs.renameSync(fromPath, newPath);
  } catch {
    next(new InternalServerError('Ошибка перемещения файла в постоянное хранилище'));
    return null;
  }

  return fileName;
};
