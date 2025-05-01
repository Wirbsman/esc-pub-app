import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { API_HOST, httpOptions } from '../../shared/constants/api';
import { SuccessResponseBody } from '../../shared/types/common-response.types';
import { Country } from '../../shared/types/country.types';

type GetCountriesResponse = SuccessResponseBody<Country[]>;

const API_BASE = 'api/v1/countries';

@Injectable({ providedIn: 'root' })
export class CountriesApiService {
    private readonly endpointBase = [API_HOST, API_BASE].join('/');
    private readonly httpClient = inject(HttpClient);

    fetchCountries$(currentYear: number): Observable<ReadonlyArray<Country>> {
        const endpoint = [this.endpointBase, currentYear].join('/');
        return this.httpClient.get<GetCountriesResponse>(endpoint, httpOptions).pipe(
            map((res) => res.data ?? []),
            catchError(() => of([])),
        );
    }
}
