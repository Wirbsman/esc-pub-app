import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { CountryRoutingParam } from '../../../../app.routing';
import { CountryRatingTileComponent, CountryUserRating } from '../../../../components/country-rating-tile/country-rating-tile.component';
import { Country } from '../../../../shared/types/country.types';
import { isDefined } from '../../../../shared/utils/is-defined.utils';
import { EscDashboardService } from '../../esc-dashboard.service';

@Component({
    selector: 'app-country-votes',
    templateUrl: './country-votes.component.html',
    styleUrls: ['./country-votes.component.css'],
    standalone: true,
    imports: [NgIf, NgForOf, CountryRatingTileComponent]
})
export class CountryVotesComponent implements OnInit, OnDestroy {
    readonly imagePath = 'assets/images/flags80/';

    private _country?: Country;
    private _userRatings: CountryUserRating[] = [];

    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly dashboardService = inject(EscDashboardService);

    private readonly destroyed$ = new Subject<void>();

    get country(): Country | undefined {
        return this._country;
    }

    get userRatings(): CountryUserRating[] {
        return this._userRatings;
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            takeUntil(this.destroyed$),
            map(paramMap => paramMap.get(CountryRoutingParam.Flag)),
            tap(flag => !flag && this.toDashboard()),
            filter(isDefined),
        ).subscribe(flag => this.init(flag));
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    toDashboard() {
        void this.router.navigateByUrl('/dashboard');
    }

    private init(flag: string) {
        this._country = this.dashboardService.countries.find(c => c.flag === flag);
        if (!!this._country?.id) {
            this._userRatings = this.dashboardService.countryRatingsMap.get(this._country.id)
                ?.map(countryRating => ({
                    name: countryRating.name,
                    rating: countryRating.rating
                })).sort((a, b) => a.name.localeCompare(b.name)) ?? [];
        } else {
            this._userRatings = [];
        }
    }
}
