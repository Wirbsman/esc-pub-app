import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST, httpOptions } from '../shared/constants/api';
import { SuccessResponseBody } from '../shared/types/common-response.types';
import { Rating, UpdateUserRating } from '../shared/types/rating.types';

type AllRatingsResponse = SuccessResponseBody<ReadonlyArray<Rating>>;
type UserRatingsResponse = SuccessResponseBody<ReadonlyArray<Rating>>;
type UpdateRatingsResponse = SuccessResponseBody<ReadonlyArray<Rating>>;

const API_BASE = 'api/v1/ratings';

@Injectable({ providedIn: 'root' })
export class RatingsService {

    private readonly endpointBase = [API_HOST, API_BASE].join('/');

    constructor(private readonly httpClient: HttpClient) {
    }

    allRatings$(): Observable<ReadonlyArray<Rating>> {
        return this.httpClient.get<AllRatingsResponse>(this.endpointBase, httpOptions).pipe(
            map(res => res.data ?? [])
        );
    }

    userRatings$(): Observable<ReadonlyArray<Rating>> {
        return this.httpClient.get<UserRatingsResponse>(`${this.endpointBase}/user`, httpOptions).pipe(
            map(res => res.data ?? [])
        );
    }

    async updateRatings(ratings: ReadonlyArray<UpdateUserRating>): Promise<ReadonlyArray<Rating>> {
        return lastValueFrom(
            this.httpClient.put<UpdateRatingsResponse>(
                `${this.endpointBase}/user`,
                ratings,
                httpOptions
            ).pipe(
                map(res => res.data ?? [])
            ));
    }
}
