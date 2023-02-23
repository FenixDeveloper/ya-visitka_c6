import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import { USER_ERR_EMAIL, USER_ERR_EMAIL_EMPTY } from '../constants';

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
