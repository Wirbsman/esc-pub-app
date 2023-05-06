import {Injectable} from '@angular/core';
import {CurrentUser} from "./current-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EscService} from "./esc.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {pipe} from "rxjs";

const AUTHORIZATION_HEADER = 'Authorization'
const CONTENT_TYPE_HEADER = 'Content-Type'
const CONTENT_TYPE = 'application/json'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient,
              private currentUser: CurrentUser,
              private route: Router,
              private escService: EscService) {
  }
  // ToDo Content Type Header austauschen / Error Handlung für HTTP Requests
  authenticate(username: string, password: string) {

    const credentials = CurrentUser.b64EncodeUnicode(username + ':' + password)

    this.http.get<any>("/rest/authenticate", {
      headers: new HttpHeaders({
        'Content-Type': CONTENT_TYPE,
        'Authorization': `Basic ${credentials}`,
      })

    }).pipe(catchError(this.escService.handleError<any>('authenticate', [])))
      .subscribe(value => this.currentUser.setUser(username, password, value.admin));

    //   sessionStorage.setItem('user', JSON.stringify(credentials));

    return !!this.currentUser;
  }


  getLoginStatus() : boolean {
    let user = sessionStorage.getItem('user');
    return user != null;

  }

  isUserAdmin() : boolean {
   return !!this.currentUser.isAdmin;
  }

  logOut() {
    this.currentUser.clear();
    //sessionStorage.removeItem('user');
    this.route.navigateByUrl("/login");
  }


}
