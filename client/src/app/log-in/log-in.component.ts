import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {CurrentUser} from "../current-user";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public username: string | null = null;
  public password: string | null = null;
  public invalidLogin = false;
  public hide = true;

  ngOnInit() {

  }

  constructor(private route: Router, private authService: AuthenticationService, private currentUser: CurrentUser) {
  }

  checkLogin() {
    if (this.username != null && this.password != null) {

      if (this.authService.authenticate(this.username, this.password)) {
        this.route.navigateByUrl('/vote');
        this.invalidLogin = false

      } else {
        this.invalidLogin = true
      }
    } else {
      this.invalidLogin = true
    }
  }

}
