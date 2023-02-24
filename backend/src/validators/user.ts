import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import { MSG_INCORRECT_ID, MSG_PAR_REQUIRED, USER_ERR_EMAIL, USER_ERR_EMAIL_EMPTY } from '../constants';
import { CustomHelpers } from 'joi';
import { Types } from 'mongoose';

export const isEmail = (email: string): boolean => validator.isEmail(email);

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
  if (Types.ObjectId.isValid(id)) return id;
  return helpers.error('any.invalid');
};

export const isUserIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
});

export const isCommentdIdValidator = celebrate({
  params: Joi.object().keys({
    commentId: Joi.string().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
});