import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EscService } from '../../services/esc.service';
import { ratingOptions } from '../../shared/constants/rating-options';

@Component({
    selector: 'app-esc-dashboard',
    templateUrl: './esc-dashboard.component.html',
    styleUrls: ['./esc-dashboard.component.css']
})
export class EscDashboardComponent implements OnInit {
    /** Based on the screen size, switch from standard to one column per row */
    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { title: 'Card 1', cols: 1, rows: 1 },
                    { title: 'Card 2', cols: 1, rows: 1 },
                    { title: 'Card 3', cols: 1, rows: 1 },
                ];
            }

            return [
                { title: 'Card 1', cols: 1, rows: 1 },
                { title: 'Card 2', cols: 1, rows: 1 },
                { title: 'Card 3', cols: 2, rows: 1 },
            ];
        })
    );

    _users: any[] = [];
    private _countries: any[] = [];
    private ratings: any[] = [];
    imagePath = 'assets/images/flags80/';

    readonly selectedRatings = ratingOptions;


    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router,
                private escService: EscService) {
    }

    get users(): any[] {

        return this._users.length > 0 ? this._users.sort((one, two) => (one.name < two.name ? -1 : 1)) : [];
    }


    get countries(): any[] {

        return this._countries.length > 0 ? this._countries.sort((n1, n2) => n1.index - n2.index) : [];
    }

    toVote(): void {

        this.router.navigateByUrl('/vote');
    }

    refresh(): void {

        this.escService.getAllRatings().subscribe({
            next: value => {
                this._users = value.users;
                this._countries = value.countries;
                this.ratings = value.ratings;

            }, error: () => {
                this._users = [];
                this._countries = [];
                this.ratings = [];
            }

        });
    }

    getRatingFor(countryId: number, userId: number): string {

        let simpleRating: any = this.ratings.find(value => value.userId === userId && value.countryId === countryId);

        return this.formatRating(simpleRating?.rating);

    }

    ngOnInit(): void {
        this.refresh();
    }

    getCountryAverage(countryId: number): string {

        let ratings: any[] = this.ratings.filter(simpleRating => simpleRating.countryId === countryId && simpleRating.rating !== null);
        let ratingSum = 0;
        ratings.forEach(simpleRating => ratingSum = ratingSum + simpleRating.rating);
        return ratings.length > 0 ? (ratingSum / ratings.length).toFixed(2).toString() : '-';

    }

    getUserAverage(userId: number): string {

        let ratings: any[] = this.ratings.filter(simpleRating => simpleRating.userId === userId && simpleRating.rating !== null);
        let ratingSum = 0;
        ratings.forEach(simpleRating => ratingSum = ratingSum + simpleRating.rating);
        return ratings.length > 0 ? (ratingSum / ratings.length).toFixed(2).toString() : '-';

    }

    formatRating(value: number): string {

        let foundRating = this.selectedRatings.find(value1 => value1.value === value);
        return foundRating ? foundRating.displayName : '-';

    }
}
