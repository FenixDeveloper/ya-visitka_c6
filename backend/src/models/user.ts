import { model, Schema } from 'mongoose';

import { IUser, IUserModel } from '../types/user';
import { IInfoBlock, InfoBlockName } from '../types/info-block';

import {
  MSG_FIELD_REQUIRED,
  MSG_INCORRECT_EMAIL,
  MSG_INCORRECT_URL,
  MSG_USER_NOT_FOUND,
} from '../constants';
import DataNotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { IUser, IUserModel } from '../types/user';
import { isEmail } from '../validators/user';
import { isUrl } from '../validators/profile';

const infoBlockSchema = new Schema<IInfoBlock>({
  text: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: false,
    validate: {
      validator: isUrl,
      message: MSG_INCORRECT_URL,
    },
  },
});

const userSchema = new Schema<IUser>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: [true, MSG_FIELD_REQUIRED],
    validate: {
      validator: (email: string): boolean => validator.isEmail(email),
      message: MSG_INCORRECT_EMAIL,
    },
  },
  cohort: String,
  profile: {
    name: String,
    photo: {
      type: String,
      required: false,
      validate: {
        validator: isUrl,
        message: MSG_INCORRECT_URL,
      },
    },
    city: {
      required: false,
      name: String,
      geocode: [Number],
    },
    birthday: {
      type: Schema.Types.Date,
      required: false,
    },
    quote: {
      type: String,
      default: '',
    },
    telegram: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    template: {
      type: String,
      required: false,
    },
  },
  info: {
    hobby: infoBlockSchema,
    status: infoBlockSchema,
    job: infoBlockSchema,
    edu: infoBlockSchema,
  },
  profile: {
    name: String,
    photo: String,
    birthday: String,
    city: {
      name: String,
      geocode: [String, String],
    },
    quote: String,
    telegram: String,
    github: String,
    template: String,
  },
  info: {
    hobby: {
      text: String,
      image: String,
    },
    status: {
      text: String,
      image: String,
    },
    job: {
      text: String,
      image: String,
    },
    edu: {
      text: String,
      image: String,
    },
  },
  reactions: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
      from: {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        name: String,
        email: {
          type: String,
          validate: {
            validator: isEmail,
            message: MSG_INCORRECT_EMAIL,
          },
        },
      },
      target: {
        type: String,
        enum: InfoBlockName,
        required: false,
      },
      text: {
        type: String,
        required: false,
      },
    },
  ],
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
