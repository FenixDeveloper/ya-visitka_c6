import validator from 'validator';
import { celebrate, Joi } from 'celebrate';

import {
  joiEmail,
  joiId,
  joiLimit,
  joiOffset,
  joiStringRequired,
} from './index';
import { joiString } from './joiUtils';

import { regexUrl } from '../constants';

export const isEmail = (email: string): boolean => validator.isEmail(email);
export const isUrl = (url: string): boolean => regexUrl.test(url);

export const isPostUserValid = celebrate({
  body: Joi.object().keys({
    email: joiEmail,
    cohort: joiStringRequired,
  }),
});

export const isPutUserValid = celebrate({
  params: Joi.object().keys({
    userId: joiId,
  }),
  body: Joi.object().keys({
    email: joiEmail,
    cohort: joiStringRequired,
  }),
});

export const isSearchUserValid = celebrate({
  query: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    search: joiString,
  }),
});
