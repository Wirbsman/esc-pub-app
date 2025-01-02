import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Subject, switchMap, takeUntil } from 'rxjs';

import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth/auth.service';
import { CountriesService } from '../../services/countries.service';
import { RatingsService } from '../../services/ratings.service';
import { UserRating } from '../../shared/types/rating.types';
import { isDefined } from '../../shared/utils/is-defined.utils';
import { UserRatingTileComponent } from './user-rating-tile/user-rating-tile.component';

@Component({
    selector: 'app-user-ratings',
    templateUrl: './user-ratings.component.html',
    styleUrls: ['./user-ratings.component.css'],
    imports: [NgIf, NgFor, AsyncPipe, FormsModule, UserRatingTileComponent],
})
export class UserRatingsComponent implements OnInit, OnDestroy {

    readonly avatarPath = 'assets/avatar/';

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
                name: country.name,
                flag: country.flag,
                artistName: country.interpret,
                artistSong: country.songname,
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

    async saveRating(rating: UserRating) {
        if (!rating.rating) {
            return;
        }

        await this.ratingsService.updateRatings([
            {
                id: rating.id,
                countryId: rating.countryId,
                rating: rating.rating
            }
        ]);
    }

    toDashboard() {
        void this.router.navigateByUrl('/dashboard');
    }

    toUserManagement() {
        void this.router.navigateByUrl('/user-management');
    }
}
