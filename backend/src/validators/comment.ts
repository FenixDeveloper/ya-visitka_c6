import { celebrate, Joi } from 'celebrate';
import methodValidateId from './index';
import {
  MSG_INCORRECT_ID,
  MSG_PAR_REQUIRED,
} from '../constants';

const isCommentIdValid = celebrate({
  params: Joi.object().keys({
    commentId: Joi.string().required().custom(methodValidateId, 'custom validation')
      .messages({
        'any.invalid': MSG_INCORRECT_ID,
        'any.required': MSG_PAR_REQUIRED,
      }),
  }),
});

export default isCommentIdValid;
