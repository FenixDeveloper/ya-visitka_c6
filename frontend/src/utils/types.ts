import { StringMappingType } from "typescript";

export interface IProfileCard {
  image: string;
  city: string;
  name:string;
  comments_number: number;
}

export interface IDropdownList {
  data: Array<string>;
  state: string;
  setState: (value: string) => void;
  title?: string;
  requiredField?: boolean;
}

export enum VizitkaStyle {
  Base = 'base',
  Romantic = 'romantic',
  Derzkiy = 'derzkiy',
} 

export interface IVizitka {
  name:string;
  image: string;
  quotes: string;
  city: string;
  contacts: {
    telegram: string;
    github?: string;
  };
  hobby: string;
  hobby_img: string;
  family: string;
  family_img: string;
  activity: string;
  studies: string;
  photo_comments_number: number;
  quotes_comments_number: number;
  hobby_comments_number: number;
  family_comments_number: number;
  activity_comments_number: number;
  studies_comments_number: number;
  style: VizitkaStyle.Base | VizitkaStyle.Romantic | VizitkaStyle.Derzkiy;
}

export interface IVizitkaAboutBlock {
  title: string;
  comments_number: number;
  img?: string;
  description: string;
  style: VizitkaStyle.Base | VizitkaStyle.Romantic | VizitkaStyle.Derzkiy;
}