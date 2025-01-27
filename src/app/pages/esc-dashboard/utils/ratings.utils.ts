import { Rating } from '../../../shared/types/rating.types';

export function ratingsAverage(ratings: ReadonlyArray<Rating>): string {
    const total = ratings.reduce((total, rating) => total + rating.rating, 0);
    return !!ratings.length ? (total / ratings.length).toFixed(2).toString() : '-';
}
