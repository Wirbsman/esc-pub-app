import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
    BehaviorSubject,
    combineLatest,
    filter,
    interval,
    Observable,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';

import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AppService } from '../../services/app.service';
import { CountriesService } from '../../services/countries.service';
import { RatingsService } from '../../services/ratings.service';
import { UsersService } from '../../services/users.service';
import { Country } from '../../shared/types/country.types';
import { User } from '../../shared/types/user.types';
import { CountryDashboardTileComponent } from './components/country-dashboard-tile/country-dashboard-tile.component';
import { EscDashboardService } from './esc-dashboard.service';
import { countriesWithAverageSortFn } from './utils/sorting.utils';

const REFRESH_INTERVAL_IN_SECONDS = 60;

@Component({
    selector: 'app-esc-dashboard',
    templateUrl: './esc-dashboard.component.html',
    styleUrls: ['./esc-dashboard.component.css'],
    imports: [
        // framework
        NgFor,
        AsyncPipe,
        RouterLink,
        // app
        HeaderComponent,
        FooterComponent,
        CountryDashboardTileComponent,
    ],
})
export default class EscDashboardComponent implements OnInit, OnDestroy {
    private readonly countries$ = new BehaviorSubject<ReadonlyArray<Country>>([]);
    private readonly _countriesSortedForList$ = new BehaviorSubject<ReadonlyArray<Country>>([]);
    private readonly triggerReload$ = new Subject<void>();
    private readonly destroyed$ = new Subject<void>();
    private readonly refreshTriggered = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly appService: AppService,
        private readonly router: Router,
        private readonly escDashboardService: EscDashboardService,
        private readonly countriesService: CountriesService,
        private readonly userService: UsersService,
        private readonly ratingsServices: RatingsService,
    ) {
        this.countriesService.countries$
            .pipe(
                takeUntilDestroyed(),
                filter(() => !this.countries$.value.length),
            )
            .subscribe((countries) => this.countries$.next(countries));

        this.triggerReload$
            .pipe(
                takeUntil(this.destroyed$),
                filter(() => !this.refreshTriggered.value),
                switchMap(() =>
                    combineLatest([
                        this.countries$,
                        this.userService.allUsers$(this.appService.currentYear),
                        this.ratingsServices.allRatings$,
                    ]),
                ),
            )
            .subscribe(([countries, users, ratings]) => {
                this.escDashboardService.init({ countries, users, ratings });
                this._countriesSortedForList$.next(
                    [...this.escDashboardService.countriesWithAverage].sort(
                        countriesWithAverageSortFn,
                    ),
                );
                this.refreshTriggered.next(false);
            });

        interval(REFRESH_INTERVAL_IN_SECONDS * 1000)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.refresh());
    }

    get countriesSortedForList$(): Observable<ReadonlyArray<Country>> {
        return this._countriesSortedForList$.asObservable();
    }

    get users(): ReadonlyArray<User> {
        return this.escDashboardService.users;
    }

    ngOnInit(): void {
        if (!this.countriesService.countries.length) {
            this.countriesService.loadCountries(this.appService.currentYear);
        }
        this.refresh();
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    toVote(): void {
        void this.router.navigateByUrl('/vote');
    }

    refresh(): void {
        this.triggerReload$.next();
        this.refreshTriggered.next(true);
    }
}
