import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, switchMap } from 'rxjs';

import { AppRoutingParams } from '../../../../routing.constants';
import { CountriesService } from '../../../../services/countries.service';
import { isDefined } from '../../../../shared/utils/is-defined.utils';

@Injectable()
export class CountryEditorService {
    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);

    private readonly countriesService = inject(CountriesService);

    private readonly _currentYear$ = new BehaviorSubject<number | null>(null);
    private readonly _countryId$ = new BehaviorSubject<string | null>(null);

    private get currentYear(): number {
        return Number(this._currentYear$.value);
    }

    get countryId(): string | null {
        return this._countryId$.value;
    }

    readonly form = this.fb.group({
        countryIsoCode: this.fb.control<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        interpret: this.fb.control<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        songname: this.fb.control<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        index: this.fb.control<number>(-1, {
            validators: [Validators.required, Validators.min(1)],
            nonNullable: true,
        }),
    });

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((paramMap) => {
            this._currentYear$.next(Number(paramMap.get(AppRoutingParams.CurrentYear)));
            this._countryId$.next(paramMap.get(AppRoutingParams.CountryId));
        });

        this._countryId$
            .pipe(
                takeUntilDestroyed(),
                filter(isDefined),
                switchMap((countryId) => this.countriesService.getCountryById$(countryId)),
            )
            .subscribe((country) => {
                if (!isDefined(country)) {
                    return;
                }
                const { id, year, countryIsoCode, interpret, songname, index } = country;
                if (year !== this.currentYear) {
                    console.warn(
                        `years do not match. [route: ${this.currentYear}, data: ${year}, id: ${id}]`,
                    );
                    return;
                }

                this.form.patchValue({
                    countryIsoCode,
                    interpret,
                    songname,
                    index: index + 1,
                });
            });
    }

    async save(): Promise<boolean> {
        if (this.countryId) {
            return await this.updateCountry();
        } else {
            return await this.addCountry();
        }
    }

    async delete(): Promise<boolean> {
        if (!isDefined(this.countryId)) {
            return false;
        }

        await this.countriesService.deleteCountry(this.countryId);
        return true;
    }

    private async addCountry(): Promise<boolean> {
        if (!this.form.valid || !this._currentYear$.value) {
            this.form.markAllAsTouched();
            return false;
        }

        const { countryIsoCode, interpret, songname, index } = this.form.value as Required<
            typeof this.form.value
        >;

        await this.countriesService.addCountry({
            year: Number(this._currentYear$.value),
            countryIsoCode: countryIsoCode,
            interpret,
            songname,
            index: Math.max(0, index - 1),
        });

        return true;
    }

    private async updateCountry(): Promise<boolean> {
        if (!this.form.valid || !this._currentYear$.value || !this.countryId) {
            this.form.markAllAsTouched();
            return false;
        }

        const { countryIsoCode, interpret, songname, index } = this.form.value as Required<
            typeof this.form.value
        >;

        await this.countriesService.updateCountry({
            id: this.countryId,
            year: Number(this._currentYear$.value),
            countryIsoCode: countryIsoCode,
            interpret,
            songname,
            index: Math.max(0, index - 1),
        });

        return true;
    }
}
