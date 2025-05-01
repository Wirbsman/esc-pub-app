export type Country = {
    id: string;
    year: number;
    countryIsoCode: string; // ISO-3361 alpha-2
    interpret: string;
    songname: string;
    index: number;

    /** @deprecated TODO: remove name */
    name: string;
    /** @deprecated TODO: remove flag */
    flag: string;
};

type CountryWithoutId = Pick<
    Country,
    'year' | 'countryIsoCode' | 'interpret' | 'songname' | 'index'
>;

type CountryLegacy = Pick<Country, 'name' | 'flag'>;

export type AddCountryBody = CountryWithoutId;

export type UpdateCountryBody = CountryWithoutId;
export type UpdateCountryBodyWithId = UpdateCountryBody & Pick<Country, 'id'>;

/** @deprecated TODO: remove AddCountryBodyLegacy */
export type AddCountryBodyLegacy = CountryWithoutId & CountryLegacy;
/** @deprecated TODO: remove UpdateCountryBodyLegacy */
export type UpdateCountryBodyLegacy = CountryWithoutId & CountryLegacy;
/** @deprecated TODO: remove UpdateCountryBodyWithIdLegacy */
export type UpdateCountryBodyWithIdLegacy = UpdateCountryBodyLegacy & Pick<Country, 'id'>;
