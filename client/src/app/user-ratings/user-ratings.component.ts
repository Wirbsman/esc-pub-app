import {Component, OnInit} from '@angular/core';
import { Ratings} from "./ratings";
import {EscService} from "../esc.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent{

  ratings: Ratings[] = [];

  imagePath = "assets/images/flags20/";

  constructor(private escService: EscService, private route: ActivatedRoute) {}

  getRatingsForUser(id: any) {
    this.escService.getRatingsForUser(id).subscribe(values => this.ratings = values);
  }

  ngOnInit(): void {
    this.getRatingsForUser(this.route.snapshot.params["id"]);
  }


}
