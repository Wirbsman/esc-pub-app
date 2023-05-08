import {Component, OnInit} from '@angular/core';
import {CurrentUser} from "./current-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Eurovision Song Contest Rating App';


  constructor(private currentUser: CurrentUser) {
    this.currentUser.load()
  }

  ngOnInit(): void {

  }
}


