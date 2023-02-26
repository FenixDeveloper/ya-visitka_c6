import { celebrate, Joi } from 'celebrate';
import { joiId } from './index';

const isCommentIdValid = celebrate({
  params: Joi.object().keys({
    commentId: joiId,
  }),
});

export default isCommentIdValid;
