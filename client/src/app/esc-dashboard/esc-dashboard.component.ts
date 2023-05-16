import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {Router} from "@angular/router";
import {EscService} from "../esc.service";

@Component({
  selector: 'app-esc-dashboard',
  templateUrl: './esc-dashboard.component.html',
  styleUrls: ['./esc-dashboard.component.css']
})
export class EscDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Card 1', cols: 1, rows: 1},
          {title: 'Card 2', cols: 1, rows: 1},
          {title: 'Card 3', cols: 1, rows: 1},
        ];
      }

      return [
        {title: 'Card 1', cols: 1, rows: 1},
        {title: 'Card 2', cols: 1, rows: 1},
        {title: 'Card 3', cols: 2, rows: 1},
      ];
    })
  );

  _users: any[] = []
  private _countries: any[] = []
  private ratings: any[] = []
  imagePath = "assets/images/flags80/"

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


  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private escService: EscService) {
  }

  get users(): any[] {

    return this._users.length > 0 ? this._users.sort((one, two) => (one.name < two.name ? -1 : 1)) : []
  }


  get countries(): any[] {

    return this._countries.length > 0 ? this._countries.sort((n1,n2) => n1.index - n2.index) : []
  }

  toVote(): void {

    this.router.navigateByUrl("/vote");
  }

  refresh(): void {

    this.escService.getAllRatings().subscribe({
      next: value => {
        this._users = value.users
        this._countries = value.countries
        this.ratings = value.ratings

      }, error: () => {
        this._users = []
        this._countries = []
        this.ratings = []
      }

    })
  }

  getRatingFor(countryId: number, userId: number): string {

    let simpleRating: any = this.ratings.find(value => value.userId === userId && value.countryId === countryId)

    return this.formatRating(simpleRating?.rating)

  }

  ngOnInit(): void {
    this.refresh()
  }

  getCountryAverage(countryId: number): string {

    let ratings: any[] = this.ratings.filter(simpleRating => simpleRating.countryId === countryId && simpleRating.rating !== null)
    let ratingSum = 0;
    ratings.forEach(simpleRating => ratingSum = ratingSum + simpleRating.rating)
    return ratings.length > 0 ? (ratingSum / ratings.length).toFixed(2).toString() : "-"

  }

  getUserAverage(userId: number): string {

    let ratings: any[] = this.ratings.filter(simpleRating => simpleRating.userId === userId && simpleRating.rating !== null)
    let ratingSum = 0;
    ratings.forEach(simpleRating => ratingSum = ratingSum + simpleRating.rating)
    return ratings.length > 0 ? (ratingSum / ratings.length).toFixed(2).toString() : "-"

  }

  formatRating(value: number) : string {

    let foundRating = this.selectedRatings.find(value1 => value1.value === value);
    return foundRating?foundRating.displayName : "-"

  }
}
