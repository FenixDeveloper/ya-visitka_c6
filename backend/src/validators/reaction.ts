import { celebrate, Joi } from 'celebrate';
import {
  joiId,
  joiStringRequired,
  joiTarget,
} from './index';

export const isPostReactionTextValid = celebrate({
  params: Joi.object().keys({
    userId: joiId,
  }),
  body: Joi.object().keys({
    target: joiTarget,
    text: joiStringRequired,
  }),
});

export const isPostReactionEmotionValid = celebrate({
  params: Joi.object().keys({
    userId: joiId,
  }),
  body: Joi.object().keys({
    target: joiTarget,
    emotion: joiStringRequired,
  }),
});
