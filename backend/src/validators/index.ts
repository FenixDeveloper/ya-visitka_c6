import { isObjectIdOrHexString } from 'mongoose';
import { CustomHelpers } from 'joi';

const methodValidateId = (id: string, helpers: CustomHelpers) => {
  if (isObjectIdOrHexString(id)) return id;
  return helpers.error('any.invalid');
};

export default methodValidateId;
