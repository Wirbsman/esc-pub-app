import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, tap } from 'rxjs';

import { AddCountryBody, Country, UpdateCountryBodyWithId } from '../shared/types/country.types';
import { getCountryName } from '../shared/utils/countries.utils';
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
        lastValueFrom(this.fetchCountries$(currentYear)).catch(() => this._countries$.next([]));
    }

    fetchCountries$(currentYear: number): Observable<ReadonlyArray<Country>> {
        return this.apiService
            .fetchCountries$(currentYear)
            .pipe(tap((countries) => this._countries$.next(countries)));
    }

    getCountryById$(countryId: string): Observable<Country | null> {
        return this.apiService.getCountryById$(countryId);
    }

    async addCountry(newCountry: AddCountryBody): Promise<Country | null> {
        return await this.apiService.addCountry({
            ...newCountry,
            flag: newCountry.countryIsoCode.toLowerCase(),
            name: getCountryName(newCountry.countryIsoCode),
        });
    }

    async updateCountry(country: UpdateCountryBodyWithId): Promise<Country | null> {
        return await this.apiService.updateCountry({
            ...country,
            flag: country.countryIsoCode.toLowerCase(),
            name: getCountryName(country.countryIsoCode),
        });
    }

    async deleteCountry(countryId: string): Promise<boolean> {
        return await this.apiService.deleteCountry(countryId);
    }
}
