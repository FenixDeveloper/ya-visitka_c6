import { Document, Model } from 'mongoose';
import { IProfile } from './profile';
import { Info } from './info';
import { ICommentReaction, IEmotionReaction } from './reaction';

export interface IUser {
  _id: string;
  createdAt: number;
  updatedAt: number;
  email: string;
  cohort: string;
  profile: IProfile;
  info: Info;
  reactions: Array<ICommentReaction | IEmotionReaction>;
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByEmailAndCohort: (email: string, cohort: string) => Promise<Document<IUser>>
  // eslint-disable-next-line no-unused-vars
  findUserByEmail: (email: string) => Promise<Document<IUser>>
}
