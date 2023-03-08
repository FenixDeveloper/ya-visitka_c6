/* eslint-disable import/prefer-default-export */
import { celebrate, Joi } from 'celebrate';

import { joiId, joiTarget } from './index';

import { MSG_CONFLICT_PEERS, MSG_MISSING_PEERS } from '../constants';

export const postReactionValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  body: Joi.object()
    .keys({
      target: joiTarget,
      text: Joi.string(),
      emotion: Joi.string(),
    })
    .xor('text', 'emotion')
    .messages({
      'object.xor': MSG_CONFLICT_PEERS,
      'object.missing': MSG_MISSING_PEERS,
    }),
});
