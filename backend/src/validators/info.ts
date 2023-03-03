/* eslint-disable import/prefer-default-export */
import { celebrate, Joi } from 'celebrate';

export const isTypeInfoValid = celebrate({
  params: Joi.object().keys({
    typeInfo: Joi.string().valid('hobby', 'status', 'job', 'edu'),
  }),
});
