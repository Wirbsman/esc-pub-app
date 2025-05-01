import { inject, Injectable } from '@angular/core';

import { Rating, UpdateUserRating } from '../shared/types/rating.types';
import { RatingsApiService } from './api/ratings-api.service';

@Injectable({ providedIn: 'root' })
export class RatingsService {
    private readonly apiService = inject(RatingsApiService);

    readonly allRatings$ = this.apiService.allRatings$();
    readonly userRatings$ = this.apiService.userRatings$();

    async updateRatings(ratings: ReadonlyArray<UpdateUserRating>): Promise<ReadonlyArray<Rating>> {
        return await this.apiService.updateRatings(ratings);
    }
}
