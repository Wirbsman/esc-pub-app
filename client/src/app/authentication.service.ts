import {Injectable} from '@angular/core';
import {CurrentUser} from "./current-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";


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
              private route: Router ) {
  }

  // ToDo Content Type Header austauschen / Error Handlung für HTTP Requests
  authenticate(username: string, password: string): any {

    const credentials = CurrentUser.b64EncodeUnicode(username + ':' + password)
    return this.http.get("/rest/authenticate", {
      headers: new HttpHeaders({
        'Content-Type': CONTENT_TYPE,
        'Authorization': `Basic ${credentials}`,
      })
    })
  }

  logOut() {
    this.currentUser.clear();
    this.route.navigateByUrl("/login");
  }
}
