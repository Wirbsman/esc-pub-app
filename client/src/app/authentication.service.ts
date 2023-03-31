import {Injectable} from '@angular/core';
import {CurrentUser} from "./current-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EscService} from "./esc.service";
import {Router} from "@angular/router";

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

  constructor(private http: HttpClient, private currentUser: CurrentUser, private route: Router) {
  }
  // ToDo Content Type Header austauschen / Error Handlung für HTTP Requests
  authenticate(username: string, password: string) {

    const credentials = CurrentUser.b64EncodeUnicode(username + ':' + password)

    if(credentials != null) {

      this.http.get<any>("/rest/authenticate", {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${credentials}`

        })

      }).subscribe(value => this.currentUser.setUser(username, password, value.admin));

      console.log(this.currentUser)


      return true
    }
     else {
       return false
    }
  }

  isUserAdmin() : boolean {
   if (this.currentUser.isAdmin){
     return true
   }
   else {
     return false
   }
  }

  logOut() {
    this.currentUser.clear();
    this.route.navigateByUrl("/login");
  }


}
