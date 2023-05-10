import {Component, OnInit} from '@angular/core';
import {EscService} from "../esc.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Rating} from "./ratings";
import {CurrentUser} from "../current-user";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent implements OnInit {

  private _ratings : any[] =  [];

  imagePath = "assets/images/flags80/";

  selectedRatings = [
    {value: 1, displayName: '1' },
    {value: 1.25, displayName: '1-' },
    {value: 1.5, displayName: '1-2' },
    {value: 1.75, displayName: '2+' },
    {value: 2, displayName: '2' },
    {value: 2.25, displayName: '2-' },
    {value: 2.5, displayName: '2-3' },
    {value: 2.75, displayName: '3+' },
    {value: 3, displayName: '3' },
    {value: 3.25, displayName: '3-' },
    {value: 3.5, displayName: '3-4' },
    {value: 3.75, displayName: '4+' },
    {value: 4, displayName: '4' },
    {value: 4.25, displayName: '4-' },
    {value: 4.5, displayName: '4-5' },
    {value: 4.75, displayName: '5+' },
    {value: 5, displayName: '5' },
    {value: 5.25, displayName: '5-' },
    {value: 5.5, displayName: '5-6' },
    {value: 5.75, displayName: '6+' },
    {value: 6, displayName: '6' },
  ]



  constructor(private escService: EscService,
              public currentUser: CurrentUser,

              private authService: AuthenticationService,
              private router: Router) {
  }


  get ratings(): any[] {

    return this._ratings.length > 0 ? this._ratings.sort((n1,n2) => n1.countryIndex - n2.countryIndex) : []

  }

  ngOnInit(): void {
    this.getRatingsForUser();

  }

  private getRatingsForUser() {
    this.escService.getRatingsForUser().subscribe(values => {
        this._ratings = values
      }
    );
  }

  public save() : void {

    this.escService.updateUserRatings(this.toRatings(this._ratings)).subscribe(() => this.getRatingsForUser());

  }

  private toRatings(ratings: any[]): Rating[] {

    return ratings.map(value => new Rating(value.countryId, value.ratingValue))

  }

  toDashboard() {
    if(this.currentUser.isAdmin) {

      this.router.navigateByUrl("/dashboard");
    }



  }

  logout() {

    this.authService.logOut();
  }
}
