import { Joi } from 'celebrate';
import mongoose from 'mongoose';

import {
  MSG_INCORRECT_DATE,
  MSG_PAR_REQUIRED,
  MSG_INCORRECT_ID,
  MSG_INCORRECT_GEOCODE,
  MSG_INCORRECT_URL,
} from '../constants';

export const joiInteger = Joi.number().integer();

export const joiString = Joi.string().default('');

export const joiId = Joi.string()
  .required()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .custom((value: string, helpers: any) => {
    if (!mongoose.isValidObjectId(value)) return helpers.error('any.invalid');
    return value;
  })
  .messages({
    'any.invalid': MSG_INCORRECT_ID,
    'any.required': MSG_PAR_REQUIRED,
  });

export const joiUrl = Joi.string()
  .uri()
  .default(null)
  .messages({ 'any.invalid': MSG_INCORRECT_URL });
export const joiDate = Joi.date()
  .iso()
  .messages({ 'any.invalid': MSG_INCORRECT_DATE });
export const joiGeoCode = Joi.array()
  .items(Joi.number())
  .length(2)
  .message(MSG_INCORRECT_GEOCODE);

export const joiTextImage = Joi.object({
  text: joiString.allow(''),
  image: joiString.allow(null),
});
