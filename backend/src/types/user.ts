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
