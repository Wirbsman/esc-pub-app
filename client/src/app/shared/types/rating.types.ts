export type Rating = {
    id: number;
    countryId: number;
    userId: number;
    rating: number;
};

export type UpdateUserRating = Pick<Rating, 'countryId' | 'rating'> & { id?: number };

export type UserRating = Partial<Pick<Rating, 'id' | 'rating'>> & {
    countryId: number;
    countryName: string;
    countryFlag: string;
    countryInterpret: string;
    countrySong: string;
    countryIndex: number;
}
