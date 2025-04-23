import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";

export interface IProfile {
  owner?: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  country?: ECountry;
  city?: string;
  address?: string;
  image?: string;
  currency?: ECurrency;
}
