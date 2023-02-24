import { IInfoBlock, InfoBlockName } from './info-block';

export type Info = {
  // eslint-disable-next-line no-unused-vars
  [blockName in InfoBlockName]: IInfoBlock;
};
