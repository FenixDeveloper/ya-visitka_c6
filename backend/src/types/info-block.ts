export enum InfoBlockName {
  HOBBY = 'hobby',
  STATUS = 'status',
  JOB = 'job',
  EDU = 'edu',
  QUOTE = 'quote',
}

export type TInfoType = 'hobby' | 'status' | 'job' | 'edu' | 'quote';

export interface IInfoBlock {
  text: string | '';
  image: string | undefined | null;
}

export interface IInfoBlockCountedReactions extends IInfoBlock {
  reactions: number;
}
