import { celebrate, Joi } from 'celebrate';
import methodValidateId from './index';
import {
  MSG_FIELD_REQUIRED,
  MSG_INCORRECT_ID,
  MSG_INCORRECT_TARGET,
  MSG_PAR_REQUIRED,
  TARGET_ARR,
} from '../constants';

export const isPostReactionTextValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
  body: Joi.object().keys({
    target: Joi.string().valid(...TARGET_ARR).allow(null).message(MSG_INCORRECT_TARGET),
    text: Joi.string().required().message(MSG_FIELD_REQUIRED),
  }),
});

export const isPostReactionEmotionValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
  body: Joi.object().keys({
    target: Joi.string().valid(...TARGET_ARR).allow(null).message(MSG_INCORRECT_TARGET),
    emotion: Joi.string().required().message(MSG_FIELD_REQUIRED),
  }),
});
