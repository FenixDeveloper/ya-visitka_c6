import { InfoBlockName } from './info-block';

export interface IReaction {
  _id: string;
  from: {
    _id: string;
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
