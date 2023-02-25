import { celebrate, Joi } from 'celebrate';
import methodValidateId from './index';
import {
  MSG_INCORRECT_DATE,
  MSG_INCORRECT_GEOCODE,
  MSG_INCORRECT_ID,
  MSG_INCORRECT_URL,
  MSG_PAR_REQUIRED,
  regexUrl,
} from '../constants';

export const isUrl = (url: string): boolean => regexUrl.test(url);

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
        image: Joi.string().uri().default(null).allow(null)
          .messages({
            'string.uri': MSG_INCORRECT_URL,
          }),
      }),
      status: Joi.object({
        text: Joi.string().empty('').default(''),
        image: Joi.string().uri().default(null).allow(null)
          .messages({
            'string.uri': MSG_INCORRECT_URL,
          }),
      }),
      job: Joi.object({
        text: Joi.string().empty('').default(''),
        image: Joi.string().uri().default(null).allow(null)
          .messages({
            'string.uri': MSG_INCORRECT_URL,
          }),
      }),
      edu: Joi.object({
        text: Joi.string().empty('').default(''),
        image: Joi.string().uri().default(null).allow(null)
          .messages({
            'string.uri': MSG_INCORRECT_URL,
          }),
      }),
    }),
  }),
});
