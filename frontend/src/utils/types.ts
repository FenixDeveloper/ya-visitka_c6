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