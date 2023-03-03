export enum InfoBlockName {
  HOBBY = 'hobby',
  STATUS = 'status',
  JOB = 'job',
  EDU = 'edu',
}

export type TInfoType = 'hobby' | 'status' | 'job' | 'edu';

export interface IInfoBlock {
  text: string | '';
  image: string | undefined | null;
}
