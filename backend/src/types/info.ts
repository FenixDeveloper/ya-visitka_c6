/* eslint-disable no-unused-vars */
import { IInfoBlock, InfoBlockName } from './info-block';

export type Info = {
  [blockName in InfoBlockName]: IInfoBlock;
};
