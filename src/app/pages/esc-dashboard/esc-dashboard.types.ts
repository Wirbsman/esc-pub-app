import { Country } from '../../shared/types/country.types';

export type CountryWithAverage = Country & {
    average?: string;
};
