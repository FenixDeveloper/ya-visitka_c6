import { ICity } from './city';

export interface IProfile {
  name: string;
  photo: string | null;
  city: ICity | null;
  birthday: string | null;
  quote: string | '';
  telegram: string | null;
  github: string | null;
  template: string | null;
}
