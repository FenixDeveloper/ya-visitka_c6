/* eslint-disable no-unused-vars */
import {
  IInfoBlock,
  IInfoBlockCountedReactions,
  InfoBlockName,
} from './info-block';

export type Info = {
  [blockName in InfoBlockName]: IInfoBlock;
};

export type InfoCountedReactions = {
  [blockName in InfoBlockName]?: IInfoBlockCountedReactions;
};
