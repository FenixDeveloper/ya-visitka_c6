import { Joi } from 'celebrate';
import { CustomHelpers } from 'joi';
import { isObjectIdOrHexString } from 'mongoose';

import { InfoBlockName } from '../types/info-block';

import {
  MSG_PAR_REQUIRED,
  MSG_INCORRECT_ID,
  MSG_INCORRECT_TARGET,
  MSG_FIELD_REQUIRED,
  USER_ERR_EMAIL,
  USER_ERR_EMAIL_EMPTY,
} from '../constants';

const methodValidateId = (id: string, helpers: CustomHelpers) => {
  if (isObjectIdOrHexString(id)) return id;
  return helpers.error('any.invalid');
};

export const joiId = Joi.string()
  .required()
  .custom(methodValidateId, 'custom validation')
  .messages({
    'any.invalid': MSG_INCORRECT_ID,
    'any.required': MSG_PAR_REQUIRED,
  });

export const joiEmail = Joi.string().required().email().messages({
  'any.required': USER_ERR_EMAIL_EMPTY,
  'string.email': USER_ERR_EMAIL,
});

export const joiTarget = Joi.string()
  .valid(...Object.values(InfoBlockName))
  .allow(null)
  .messages({
    'any.only': MSG_INCORRECT_TARGET,
  });

export const joiStringRequired = Joi.string().required().messages({
  'any.required': MSG_FIELD_REQUIRED,
});

export const joiStringOptional = Joi.string().optional();

export const joiSearch = Joi.string().default('').allow('');

export const joiLimit = Joi.number().integer().positive().default(20);

export const joiOffset = Joi.number().integer().positive().default(0);
