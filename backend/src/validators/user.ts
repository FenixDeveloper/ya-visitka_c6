import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import { isObjectIdOrHexString } from 'mongoose';
import { CustomHelpers } from 'joi';
import {
  MSG_FIELD_REQUIRED,
  MSG_INCORRECT_ID,
  MSG_PAR_REQUIRED,
  regexUrl,
  USER_ERR_EMAIL,
  USER_ERR_EMAIL_EMPTY,
} from '../constants';

export const isEmail = (email: string): boolean => validator.isEmail(email);

export const isUrl = (url: string): boolean => regexUrl.test(url);

export const isLoginRequestValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': USER_ERR_EMAIL_EMPTY,
      'string.email': USER_ERR_EMAIL,
    }),
    cohort: Joi.string().optional(),
  }),
});

const methodValidateId = (id: string, helpers: CustomHelpers) => {
  if (isObjectIdOrHexString(id)) return id;
  return helpers.error('any.invalid');
};

export const isPostUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': USER_ERR_EMAIL_EMPTY,
      'string.email': USER_ERR_EMAIL,
    }),
    cohort: Joi.string().required().message(MSG_FIELD_REQUIRED),
  }),
});

export const isPutUserValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': USER_ERR_EMAIL_EMPTY,
      'string.email': USER_ERR_EMAIL,
    }),
    cohort: Joi.string().required().message(MSG_FIELD_REQUIRED),
  }),
});

export const isCommentIdValid = celebrate({
  params: Joi.object().keys({
    commentId: Joi.string().required().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
});
