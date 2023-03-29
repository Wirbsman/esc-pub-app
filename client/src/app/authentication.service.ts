import {Injectable} from '@angular/core';
import {CurrentUser} from "./current-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EscService} from "./esc.service";

const AUTHORIZATION_HEADER = 'Authorization'
const CONTENT_TYPE_HEADER = 'Content-Type'
const CONTENT_TYPE = 'application/json'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private currentUser: CurrentUser, private escService: EscService) {
  }
  // ToDo Content Type Header austauschen / Error Handlung für HTTP Requests
  authenticate(username: string, password: string) {

    const credentials = CurrentUser.b64EncodeUnicode(username + ':' + password)

    console.log(credentials);

    if(credentials != null) {

      this.http.get<any>("/rest/authenticate", {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${credentials}`

        })

      }).subscribe(value => this.currentUser.setUser(username, password, value.admin));


      return true
    }
     else {
       return false
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }


}
