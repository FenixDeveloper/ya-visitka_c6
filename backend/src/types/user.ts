import { Document, Model, Schema } from 'mongoose';

import { Info, InfoCountedReactions } from './info';
import { IProfile } from './profile';
import { ICommentReaction, IEmotionReaction } from './reaction';

export interface IUser {
  _id: Schema.Types.ObjectId;
  createdAt: Schema.Types.Date;
  updatedAt: Schema.Types.Date;
  email: string;
  cohort: string;
  profile: IProfile;
  info: Info;
  reactions: Array<ICommentReaction | IEmotionReaction>;
}

export interface IUserFiltered
  extends Omit<IUser, 'profile' | 'info' | 'reactions'> {
  name?: string;
}

export interface IUserCountedReactions
  extends Omit<IUser, 'reactions' | 'info'> {
  reactions: number;
  info: InfoCountedReactions;
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByEmail: (email: string) => Promise<Document<IUser>>;
}
