import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import {
  joiEmail,
  joiId,
  joiStringRequired,
} from './index';
import { regexUrl } from '../constants';

export const isEmail = (email: string): boolean => validator.isEmail(email);
export const isUrl = (url: string): boolean => regexUrl.test(url);

export const isLoginRequestValid = celebrate({
  body: Joi.object().keys({
    email: joiEmail,
    cohort: Joi.string().optional(),
  }),
});

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

export const isCommentIdValid = celebrate({
  params: Joi.object().keys({
    commentId: joiId,
    cohort: joiStringRequired,
  }),
});
