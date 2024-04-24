import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../../current-user';
import { Rating } from '../../model/ratings';
import { AuthenticationService } from '../../services/authentication.service';
import { EscService } from '../../services/esc.service';
import { ratingOptions } from '../../shared/constants/rating-options';

@Component({
    selector: 'app-user-ratings',
    templateUrl: './user-ratings.component.html',
    styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent implements OnInit {

    private _ratings: any[] = [];

    imagePath = 'assets/images/flags80/';
    avatarPath = 'assets/avatar/';

    readonly selectedRatings = ratingOptions;


    constructor(private escService: EscService,
                public currentUser: CurrentUser,
                private authService: AuthenticationService,
                private router: Router) {
    }


    get ratings(): any[] {

        return this._ratings.length > 0 ? this._ratings.sort((n1, n2) => n1.countryIndex - n2.countryIndex) : [];

    }

    ngOnInit(): void {
        this.getRatingsForUser();

    }

    private getRatingsForUser() {
        this.escService.getRatingsForUser().subscribe(values => {
                this._ratings = values;
            }
        );
    }

    public save(): void {

        this.escService.updateUserRatings(this.toRatings(this._ratings)).subscribe(() => this.getRatingsForUser());

    }

    private toRatings(ratings: any[]): Rating[] {

        return ratings.map(value => new Rating(value.countryId, value.ratingValue));

    }

    toDashboard() {
        if (this.currentUser.isAdmin) {

            this.router.navigateByUrl('/dashboard');
        }


    }

    toUserManagement() {
        if (this.currentUser.isAdmin) {

            this.router.navigateByUrl('/user-management');
        }
    }

    logout() {

        this.authService.logOut();
    }
}
