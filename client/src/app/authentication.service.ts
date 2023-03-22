import {Injectable} from '@angular/core';
import {CurrentUser} from "./current-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const AUTHORIZATION_HEADER = 'Authorization'
const CONTENT_TYPE_HEADER = 'Content-Type'
const CONTENT_TYPE = 'application/json; charset=UTF-8'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  authenticate(username: string, password: string) {

    /* const credentials = AuthenticationService.b64EncodeUnicode(username + ':' + password)

     this.http.get("/authenticate", {
       headers: new HttpHeaders({
         CONTENT_TYPE_HEADER: CONTENT_TYPE,
         AUTHORIZATION_HEADER: `Basic ${credentials}`

       })
     }).subscribe();value => sessionStorage.setItem('user', value));

     return true;*/
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  private static b64EncodeUnicode(str: string): string {
    // generating constant prevents 'Expression form not supported.' error
    const rawString = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(('0x' + p1) as any))
    return btoa(rawString)
  }

}
