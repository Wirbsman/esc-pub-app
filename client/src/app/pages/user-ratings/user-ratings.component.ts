import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, lastValueFrom, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth/auth.service';
import { CountriesService } from '../../services/countries.service';
import { RatingsService } from '../../services/ratings.service';
import { ratingOptions } from '../../shared/constants/rating-options';
import { UserRating } from '../../shared/types/rating.types';
import { isDefined } from '../../shared/utils/is-defined.utils';

@Component({
    selector: 'app-user-ratings',
    templateUrl: './user-ratings.component.html',
    styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent implements OnInit, OnDestroy {

    readonly imagePath = 'assets/images/flags80/';
    readonly avatarPath = 'assets/avatar/';
    readonly ratingOptions = ratingOptions;

    private _userRatings: ReadonlyArray<UserRating> = [];

    private readonly triggerReload$ = new Subject<void>();
    private readonly destroyed$ = new Subject<void>();

    constructor(readonly appService: AppService,
                private readonly authService: AuthService,
                private readonly ratingsService: RatingsService,
                private readonly countriesService: CountriesService,
                private readonly router: Router) {
        this.triggerReload$.pipe(
            takeUntil(this.destroyed$),
            switchMap(() => combineLatest([
                this.countriesService.countries$,
                this.ratingsService.userRatings$()
            ]))
        ).subscribe(([countries, ratings]) => {
            this._userRatings = countries.map(country => ({
                countryId: country.id,
                countryName: country.name,
                countryFlag: country.flag,
                countryInterpret: country.interpret,
                countrySong: country.songname,
                countryIndex: country.index,
                ...(ratings.find(rating => rating.countryId === country.id))
            })).filter(isDefined).sort((a, b) => a.countryIndex - b.countryIndex);
        });
    }


    get userRatings(): ReadonlyArray<UserRating> {
        return this._userRatings;
    }

    ngOnInit(): void {
        if (!this.countriesService.countries.length) {
            this.countriesService.loadCountries();
        }
        this.triggerReload$.next();
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    async save() {
        const input = this.userRatings
            .map(({ id, countryId, rating }) => !rating ? undefined : {
                    id,
                    countryId,
                    rating
                }
            ).filter(isDefined);
        await this.ratingsService.updateRatings(input);
    }

    toDashboard() {
        void this.router.navigateByUrl('/dashboard');
    }

    toUserManagement() {
        void this.router.navigateByUrl('/user-management');
    }

    logout() {
        void lastValueFrom(this.authService.logout$().pipe(
            tap(() => this.appService.isLoggedIn = false),
            tap(() => void this.router.navigateByUrl('/'))
        ));
    }
}
