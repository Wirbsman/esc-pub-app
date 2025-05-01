import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';

import { Country } from '../shared/types/country.types';
import { CountriesApiService } from './api/countries-api.service';

@Injectable({ providedIn: 'root' })
export class CountriesService {
    private readonly _countries$ = new BehaviorSubject<ReadonlyArray<Country>>([]);
    private readonly apiService = inject(CountriesApiService);

    get countries$(): Observable<ReadonlyArray<Country>> {
        return this._countries$.asObservable();
    }

    get countries(): ReadonlyArray<Country> {
        return this._countries$.value;
    }

    loadCountries(currentYear: number) {
        lastValueFrom(this.apiService.fetchCountries$(currentYear))
            .then((countries) => this._countries$.next(countries))
            .catch(() => this._countries$.next([]));
    }
}
