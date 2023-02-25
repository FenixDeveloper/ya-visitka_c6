export enum InfoBlockName {
  HOBBY = 'hobby',
  STATUS = 'status',
  JOB = 'job',
  EDU = 'edu',
}

export interface IInfoBlock {
  text: string | '';
  image: string | undefined;
}
