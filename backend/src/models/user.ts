import { model, Schema } from 'mongoose';

import {
  ICommentReaction,
  IEmotionReaction,
  IReaction,
} from '../types/reaction';
import { IUser, IUserModel } from '../types/user';
import { IInfoBlock, InfoBlockName } from '../types/info-block';

import { isEmail, isUrl } from '../validators/user';

import DataNotFoundError from '../errors/NotFoundError';

import {
  MSG_FIELD_REQUIRED,
  MSG_INCORRECT_EMAIL,
  MSG_INCORRECT_URL,
  MSG_USER_NOT_FOUND,
} from '../constants';

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

const reactionSchema = new Schema<IReaction>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  from: {
    type: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      name: String,
      email: String,
    },
    required: true,
  },
  target: {
    type: String,
    enum: [...Object.values(InfoBlockName), null],
    required: false,
  },
});

const commentSchema = new Schema({ text: String });
const emotionSchema = new Schema({ emotion: String });

const userSchema = new Schema<IUser>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    auto: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: [true, MSG_FIELD_REQUIRED],
    validate: {
      validator: isEmail,
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
  reactions: [reactionSchema],
});

userSchema.static('findUserByEmail', function findUserByEmail(email: string) {
  return this.findOne({ email }).then((user: IUser | null) => {
    if (!user) {
      return Promise.reject(new DataNotFoundError(MSG_USER_NOT_FOUND));
    }
    return user;
  });
});

const docArray = userSchema.path<Schema.Types.Array>('reactions');

export const Comment = docArray.discriminator<ICommentReaction>(
  'comment',
  commentSchema,
);
export const Emotion = docArray.discriminator<IEmotionReaction>(
  'emotion',
  emotionSchema,
);

export default model<IUser, IUserModel>('user', userSchema);
