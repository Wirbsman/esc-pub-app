import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { API_HOST, httpOptions } from '../../shared/constants/api';
import { EmptyResponseBody, SuccessResponseBody } from '../../shared/types/common-response.types';
import {
    AddCountryBody,
    AddCountryBodyLegacy,
    Country,
    UpdateCountryBodyWithId,
    UpdateCountryBodyWithIdLegacy,
} from '../../shared/types/country.types';

type GetCountriesResponse = SuccessResponseBody<Country[]>;
type GetCountryResponse = SuccessResponseBody<Country>;
type AddCountryResponse = SuccessResponseBody<Country>;
type UpdateCountryResponse = SuccessResponseBody<Country>;
type DeleteCountryResponse = EmptyResponseBody;

const API_BASE = 'api/v1/countries';

@Injectable({ providedIn: 'root' })
export class CountriesApiService {
    private readonly endpointBase = [API_HOST, API_BASE].join('/');
    private readonly httpClient = inject(HttpClient);

    fetchCountries$(year: number): Observable<ReadonlyArray<Country>> {
        return this.httpClient
            .get<GetCountriesResponse>(this.endpointBase, {
                ...httpOptions,
                params: { year },
            })
            .pipe(
                map((res) => res.data ?? []),
                catchError(() => of([])),
            );
    }

    getCountryById$(countryId: string): Observable<Country | null> {
        const endpoint = [this.endpointBase, countryId].join('/');
        return this.httpClient.get<GetCountryResponse>(endpoint, httpOptions).pipe(
            map((res) => res.data ?? null),
            catchError(this.handleError('getCountryById', null)),
        );
    }

    async addCountry(newCountry: AddCountryBody | AddCountryBodyLegacy): Promise<Country | null> {
        return lastValueFrom(
            this.httpClient
                .post<AddCountryResponse>(this.endpointBase, newCountry, httpOptions)
                .pipe(
                    map((res) => res.data ?? null),
                    catchError(this.handleError('addCountry', null)),
                ),
        );
    }

    async updateCountry(
        country: UpdateCountryBodyWithId | UpdateCountryBodyWithIdLegacy,
    ): Promise<Country | null> {
        const { id, ...updateBody } = country;
        return lastValueFrom(
            this.httpClient
                .put<UpdateCountryResponse>(`${this.endpointBase}/${id}`, updateBody, httpOptions)
                .pipe(
                    map((res) => res.data ?? null),
                    catchError(this.handleError('updateCountry', null)),
                ),
        );
    }

    async deleteCountry(countryId: string): Promise<boolean> {
        return lastValueFrom(
            this.httpClient
                .delete<DeleteCountryResponse>(`${this.endpointBase}/${countryId}`, httpOptions)
                .pipe(
                    map((res) => !!res),
                    catchError(this.handleError('deleteCountry', false)),
                ),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: unknown): Observable<T> => {
            console.error(operation, error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
