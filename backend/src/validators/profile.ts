/* eslint-disable import/prefer-default-export */
import { celebrate, Joi } from 'celebrate';

import {
  joiDate,
  joiGeoCode,
  joiId,
  joiInteger,
  joiString,
  joiTextImage,
  joiUrl,
} from './joiUtils';

export const joiOffset = joiInteger.default(0).min(0);
export const joiLimit = joiInteger.default(20).max(50).min(1);

export const validateProfileQuerry = celebrate({
  query: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    cohort: joiString.default(null),
  }),
});

export const validateIdParam = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
});

export const validateReactionsQuerry = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  query: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
  }),
});

export const isPatchProfileValid = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  body: Joi.object().keys({

    profile: Joi.object({
      name: Joi.string().required(),
      photo: joiUrl.required(),
      city: Joi.object({
        name: Joi.string(),
        geocode: joiGeoCode,
      }).required(),
      birthday: joiDate.required(),
      quote: joiString.required(),
      telegram: joiString.required(),
      github: joiString.required(),
      template: joiString.required(),
    }).required(),

    info: Joi.object({
      hobby: joiTextImage,
      status: joiTextImage,
      job: joiTextImage,
      edu: joiTextImage,
    }).required(),
  }),
});
