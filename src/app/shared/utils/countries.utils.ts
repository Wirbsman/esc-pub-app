import { COUNTRIES_BY_ALPHA2 } from '../constants/countries.constants';
import { Country } from '../types/country.types';

export function getCountryName(isoCode: string): string {
    return COUNTRIES_BY_ALPHA2[isoCode as keyof typeof COUNTRIES_BY_ALPHA2];
}

export function sortByIndexAsc(a: Country, b: Country): number {
    return a.index - b.index;
}
