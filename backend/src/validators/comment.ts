import { celebrate, Joi } from 'celebrate';
import {
  joiId,
  joiLimit,
  joiOffset,
  joiStringOptional,
} from './index';

export const isGetCommentValid = celebrate({
  query: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    search: joiStringOptional,
  }),
});

export const isCommentIdValid = celebrate({
  params: Joi.object().keys({
    commentId: joiId,
  }),
});
