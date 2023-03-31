import {Component, OnInit} from '@angular/core';
import {EscService} from "../esc.service";
import {ActivatedRoute} from "@angular/router";
import {Rating} from "./ratings";

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent implements OnInit {

  ratings : any[] =  [];

  imagePath = "assets/images/flags20/";

  constructor(private escService: EscService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRatingsForUser();

  }

  private getRatingsForUser() {
    this.escService.getRatingsForUser().subscribe(values => {
        this.ratings = values
      }
    );
  }

  public save() : void {

    this.escService.updateUserRatings(this.toRatings(this.ratings)).subscribe(() => this.getRatingsForUser());

  }

  private toRatings(ratings: any[]): Rating[] {

    return ratings.map(value => new Rating(value.countryId, value.ratingValue))

  }
}
