import { Types } from 'mongoose';

import { InfoBlockName } from './info-block';

export interface IReaction {
  _id: Types.ObjectId;
  from: {
    _id: Types.ObjectId;
    name: string;
    email: string;
  };
  target: InfoBlockName | null;
}

export interface ICommentReaction extends IReaction {
  text: string;
}

export interface IEmotionReaction extends IReaction {
  emotion: string;
}
