import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit{

  public username = "username";
  public password = "password";
  public invalidLogin = false;

  ngOnInit(){

  }
  constructor(private route: Router, private authService: AuthenticationService) {
  }

  checkLogin() {
    if(this.authService.authenticate(this.username, this.password))
    {
      this.route.navigateByUrl('/menu');
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }
}
