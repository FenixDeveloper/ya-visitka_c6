import { model, Schema } from 'mongoose';
import { IUser, IUserModel } from '../types/user';
import { isEmail } from '../validators/user';
import {
  MSG_FIELD_REQUIRED,
  MSG_INCORRECT_EMAIL,
  MSG_USER_NOT_FOUND,
} from '../constants';
import UnauthorizedError from '../errors/UnauthorizedError';
import DataNotFoundError from '../errors/NotFoundError';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, MSG_FIELD_REQUIRED],
    validate: {
      validator: isEmail,
      message: MSG_INCORRECT_EMAIL,
    },
  },
  cohort: {
    type: String,
  },
});

userSchema.static(
  'findUserByEmailAndCohort',
  function findUserByEmailAndCohort(email: string, cohort: string) {
    return this.findOne({ email, cohort }).then((user: IUser | null) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError());
      }
      return user;
    });
  },
);

userSchema.static('findUserByEmail', function findUserByEmail(email: string) {
  return this.findOne({ email }).then((user: IUser | null) => {
    if (!user) {
      return Promise.reject(new DataNotFoundError(MSG_USER_NOT_FOUND));
    }
    return user;
  });
});

export default model<IUser, IUserModel>('user', userSchema);
