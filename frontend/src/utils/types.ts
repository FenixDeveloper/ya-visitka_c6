export interface IProfileCard {
  image: string;
  city: string;
  name:string;
  comments_number: number;
  key?:number;
}

export interface IDropdownList {
  title: string;
  data:Array<string>;
}

export interface IVizitka {
  name:string;
  image: string;
  motto: string;
  city: string;
  contacts: {
    telegram: string;
    github?: string;
  };
  hobby: string;
  family: string;
  activity: string;
  studies: string;
}