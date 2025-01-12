import { CountryAndArtist } from './country-and-artist.types';

export type Rating = {
    id: string;
    countryId: string;
    userId: string;
    rating: number;
};

export type UpdateUserRating = Pick<Rating, 'countryId' | 'rating'> & { id?: string };

export type UserRating = Partial<Pick<Rating, 'id' | 'rating'>> &
    CountryAndArtist & {
        countryId: string;
        countryIndex: number;
    };
