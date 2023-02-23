import { model, Schema } from 'mongoose';
import { IUser, IUserModel } from '../types/user';
import { isEmail } from '../validators/user';
import { MSG_FIELD_REQUIRED, MSG_INCORRECT_EMAIL } from '../constants';
import UnauthorizedError from '../errors/UnauthorizedError';

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

userSchema.static('findUserByEmailAndCohort', function findUserByEmailAndCohort(email: string, cohort: string) {
  return this.findOne({ email, cohort })
    .then((user: IUser | null) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError());
      }
      return user;
    });
});

export default model<IUser, IUserModel>('user', userSchema);
