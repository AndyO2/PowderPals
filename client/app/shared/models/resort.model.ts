import { Country } from './country.enum';
export class Resort {
  _id?: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: Country;
  continent?: string;
  rating?: number;
  priceLevel?: number;
}
