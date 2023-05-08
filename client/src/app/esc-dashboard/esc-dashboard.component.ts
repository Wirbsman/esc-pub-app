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
  public countries: any[] = []
  private ratings: any[] = []


  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private escService: EscService) {
  }

  get users(): any[] {

    return this._users.length > 0 ? this._users.sort((one, two) => (one.name > two.name ? -1 : 1)) : []
  }

  toVote(): void {

    this.router.navigateByUrl("/vote");
  }

  refresh(): void {

    this.escService.getAllRatings().subscribe({
      next: value => {
        this._users = value.users
        this.countries = value.countries
        this.ratings = value.ratings

      }, error: () => {
        this._users = []
        this.countries = []
        this.ratings = []
      }

    })
  }

  getRatingFor(countryId: number, userId: number): string {

    let rating: any = this.ratings.find(value => value.userId === userId && value.countryId === countryId);
    return rating ? rating.rating.toString() : "---"

  }

  ngOnInit(): void {
    this.refresh()
  }

  getCountryAverage(countryId: number): string {

    let ratings: any[] = this.ratings.filter(value => value.countryId === countryId)
    let ratingSum = 0;
    ratings.forEach(value => ratingSum = ratingSum + value.rating)
    console.log("SummeLand",ratings.length, ratingSum)
    return (ratingSum / ratings.length).toString()

  }

  getUserAverage(userId: number): string {

    let ratings: any[] = this.ratings.filter(simpleRating => simpleRating.userId === userId)
    let ratingSum = 0;
    ratings.forEach(simpleRating => ratingSum = ratingSum + simpleRating.rating)
    console.log("SummeUser",ratings.length, ratingSum)
    return (ratingSum / ratings.length).toString()

  }
}
