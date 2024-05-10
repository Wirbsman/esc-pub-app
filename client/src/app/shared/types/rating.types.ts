import { CountryAndArtist } from './country-and-artist.types';

export type Rating = {
    id: number;
    countryId: number;
    userId: number;
    rating: number;
};

export type UpdateUserRating = Pick<Rating, 'countryId' | 'rating'> & { id?: number };

export type UserRating = Partial<Pick<Rating, 'id' | 'rating'>> & CountryAndArtist & {
    countryId: number;
    countryIndex: number;
}
