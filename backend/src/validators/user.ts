import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import {
  joiEmail,
  joiId,
  joiLimit,
  joiOffset,
  joiStringOptional,
  joiStringRequired,
} from './index';
import { regexUrl } from '../constants';
import { joiLimit, joiOffset } from './profile';
import { joiString } from './joiUtils';

export const isEmail = (email: string): boolean => validator.isEmail(email);
export const isUrl = (url: string): boolean => regexUrl.test(url);

export const isLoginRequestValid = celebrate({
  body: Joi.object().keys({
    email: joiEmail,
    cohort: joiStringOptional,
  }),
});

export const isPostUserValid = celebrate({
  body: Joi.object().keys({
    email: joiEmail,
    cohort: joiStringRequired,
  }),
});

export const isGetUserValid = celebrate({
  query: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    search: joiStringOptional,
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

export const isCommentIdValid = celebrate({
  params: Joi.object().keys({
    commentId: joiId,
    cohort: joiStringRequired,
  }),
});
