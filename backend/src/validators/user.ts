import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import { isObjectIdOrHexString } from 'mongoose';
import { CustomHelpers } from 'joi';
import {
  MSG_FIELD_REQUIRED,
  MSG_INCORRECT_DATE,
  MSG_INCORRECT_GEOCODE,
  MSG_INCORRECT_ID,
  MSG_INCORRECT_URL,
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
    cohort: Joi.string().required().messages({
      'any.required': MSG_FIELD_REQUIRED,
    }),
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
    cohort: Joi.string().required().messages({
      'any.required': MSG_FIELD_REQUIRED,
    }),
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

export const isProfileIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
});

export const isPatchProfileValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(methodValidateId, 'custom validation').messages({
      'any.invalid': MSG_INCORRECT_ID,
      'any.required': MSG_PAR_REQUIRED,
    }),
  }),
  body: Joi.object().keys({
    profile: Joi.object({
      name: Joi.string(),
      photo: Joi.string().uri().allow(null)
        .message(MSG_INCORRECT_URL),
      city: Joi.object({
        name: Joi.string(),
        geocode: Joi.array().items(Joi.number()).length(2)
          .message(MSG_INCORRECT_GEOCODE),
      }).allow(null),
      birthday: Joi.date().iso().allow(null).messages({
        'string.isoDate': MSG_INCORRECT_DATE,
      }),
      quote: Joi.string().allow(''),
      telegram: Joi.string().allow(null),
      github: Joi.string().allow(null),
      template: Joi.string().allow(null),
    }),
    info: Joi.object({
      hobby: Joi.object({
        text: Joi.string().empty('').default(''),
        image: Joi.string().uri().default(null).allow(null).messages({
          'string.uri': MSG_INCORRECT_URL,
        }),
      }),
      status: Joi.object({
        text: Joi.string().empty('').default(''),
        image: Joi.string().uri().default(null).allow(null).messages({
          'string.uri': MSG_INCORRECT_URL,
        }),
      }),
      job: Joi.object({
        text: Joi.string().empty('').default(''),
        image: Joi.string().uri().default(null).allow(null).messages({
          'string.uri': MSG_INCORRECT_URL,
        }),
      }),
      edu: Joi.object({
        text: Joi.string().empty('').default(''),
        image: Joi.string().uri().default(null).allow(null).messages({
          'string.uri': MSG_INCORRECT_URL,
        }),
      }),
    }),
  }),
});
