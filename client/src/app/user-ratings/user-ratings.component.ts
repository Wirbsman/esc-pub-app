import {Component, OnInit} from '@angular/core';
import {Ratings} from "./ratings";
import {EscService} from "../esc.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent implements OnInit {

  ratings = new Array<any>();

  imagePath = "assets/images/flags20/";

  constructor(private escService: EscService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRatingsForUser();

  }

  getRatingsForUser() {
    this.escService.getRatingsForUser().subscribe(values => {
        this.ratings = values
      }
    );
  }

  save() {
  }
}
