import { Country } from "./country.interface";
import { Region } from './region.type';

export interface CacheStore {
  capital: TermCountries;
  name: TermCountries;
  region: RegionCountries;
}

export interface TermCountries {
  term: string | Region;
  countries: Country[];
}

export interface RegionCountries {
  term: string | Region;
  countries: Country[];
}
