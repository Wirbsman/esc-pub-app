import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject, switchMap, takeUntil } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { RatingsService } from '../../services/ratings.service';
import { UserService } from '../../services/user.service';
import { Country } from '../../shared/types/country.types';
import { User } from '../../shared/types/user.types';
import { CountryDashboardTileComponent } from './components/country-dashboard-tile/country-dashboard-tile.component';
import { EscDashboardService } from './esc-dashboard.service';

@Component({
    selector: 'app-esc-dashboard',
    templateUrl: './esc-dashboard.component.html',
    styleUrls: ['./esc-dashboard.component.css'],
    standalone: true,
    imports: [NgFor, RouterLink, CountryDashboardTileComponent]
})
export class EscDashboardComponent implements OnInit, OnDestroy {

    readonly imagePath = 'assets/images/flags80/';

    private readonly countries$ = new BehaviorSubject<ReadonlyArray<Country>>([]);
    private readonly triggerReload$ = new Subject<void>();
    private readonly destroyed$ = new Subject<void>();

    constructor(private readonly router: Router,
                private readonly escDashboardService: EscDashboardService,
                private readonly countriesService: CountriesService,
                private readonly userService: UserService,
                private readonly ratingsServices: RatingsService) {
        this.triggerReload$.pipe(
            takeUntil(this.destroyed$),
            switchMap(() => combineLatest([
                this.countries$,
                this.userService.allUsers$(),
                this.ratingsServices.allRatings$()
            ]))
        ).subscribe(([countries, users, ratings]) =>
            this.escDashboardService.init({ countries, users, ratings })
        );
    }

    get countries(): ReadonlyArray<Country> {
        return this.countries$.value;
    }

    get users(): ReadonlyArray<User> {
        return this.escDashboardService.users;
    }

    ngOnInit(): void {
        this.initCountries();
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
    }

    private initCountries(): void {
        this.countries$.next([...this.countriesService.countries].sort((cA, cB) => cA.index - cB.index));
    }
}
