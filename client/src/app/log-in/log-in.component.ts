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

  public username = "";
  public password = "";
  public invalidLogin = false;
  public hide = true;

  ngOnInit() {

  }

  constructor(private route: Router, private authService: AuthenticationService, private currentUser: CurrentUser) {
  }

  checkLogin(username: string, password: string) {
    if (this.username != null && this.password != null) {

      this.authService.authenticate(this.username, this.password).subscribe({
        next: (value: any) => {
        this.currentUser.setUser(username, password, value.admin);

        if (this.currentUser) {
          this.route.navigateByUrl('/vote');
          this.currentUser.save()
          this.invalidLogin = false
        }},
          error: () => this.invalidLogin = true
    })

    } else {
      this.invalidLogin = true
    }

  }

}
