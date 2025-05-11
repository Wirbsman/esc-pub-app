import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, switchMap } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AppRoutingParams } from '../../../../routing.constants';
import { CountriesService } from '../../../../services/countries.service';
import { CountryAndArtistWithId } from '../../../../shared/types/country-and-artist.types';
import { getCountryName, sortByIndexAsc } from '../../../../shared/utils/countries.utils';
import { isDefined } from '../../../../shared/utils/is-defined.utils';

@Injectable()
export class CountryListService {
    private readonly route = inject(ActivatedRoute);
    private readonly countriesService = inject(CountriesService);

    private readonly currentYear$ = this.route.paramMap.pipe(
        map((paramMap) => paramMap.get(AppRoutingParams.CurrentYear)),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    private _countries = signal<ReadonlyArray<CountryAndArtistWithId>>([]);

    readonly title$ = this.currentYear$.pipe(map((currentYear) => `${currentYear}`));
    readonly countries = computed(() => this._countries());

    constructor() {
        this.currentYear$
            .pipe(
                distinctUntilChanged(),
                filter(isDefined),
                map(Number),
                takeUntilDestroyed(),
                switchMap((currentYear) => this.countriesService.fetchCountries$(currentYear)),
            )
            .subscribe((countries) =>
                this._countries.set(
                    [...countries]
                        .sort(sortByIndexAsc)
                        .map(({ id, countryIsoCode, interpret, songname, index }) => ({
                            id,
                            name: getCountryName(countryIsoCode),
                            artistName: interpret,
                            artistSong: songname,
                            flag: countryIsoCode.toLowerCase(),
                            order: index + 1,
                        })),
                ),
            );
    }
}
