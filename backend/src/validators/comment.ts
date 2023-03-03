import { celebrate, Joi } from 'celebrate';
import {
  joiId,
  joiLimit,
  joiOffset,
  joiSarch,
} from './index';

export const isGetCommentValid = celebrate({
  query: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    search: joiSarch,
  }),
});

export const isCommentIdValid = celebrate({
  params: Joi.object().keys({
    commentId: joiId,
  }),
});
