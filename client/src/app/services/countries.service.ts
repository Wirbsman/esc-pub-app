import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { API_HOST, httpOptions } from '../shared/constants/api';
import { SuccessResponseBody } from '../shared/types/common-response.types';
import { Country } from '../shared/types/country.types';

type GetCountriesResponse = SuccessResponseBody<Country[]>;

const API_BASE = 'api/v1/countries';

@Injectable({ providedIn: 'root' })
export class CountriesService {
    private _countries$ = new BehaviorSubject<ReadonlyArray<Country>>([]);
    private readonly endpointBase = [API_HOST, API_BASE].join('/');

    constructor(private readonly httpClient: HttpClient) {}

    get countries$(): Observable<ReadonlyArray<Country>> {
        return this._countries$.asObservable();
    }

    get countries(): ReadonlyArray<Country> {
        return this._countries$.value;
    }

    loadCountries() {
        lastValueFrom(this.fetchCountries$())
            .then((countries) => this._countries$.next(countries))
            .catch(() => this._countries$.next([]));
    }

    private fetchCountries$(): Observable<ReadonlyArray<Country>> {
        return this.httpClient.get<GetCountriesResponse>(this.endpointBase, httpOptions).pipe(
            map((res) => res.data ?? []),
            catchError(() => of([])),
        );
    }
}
