import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from "./user";
import {CurrentUser} from "./current-user";


const AUTHORIZATION_HEADER = 'Authorization'
const CONTENT_TYPE_HEADER = 'Content-Type'
const CONTENT_TYPE = 'application/json'

@Injectable({
  providedIn: 'root'
})

export class EscService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private currentUser: CurrentUser) {
  }

  private usersUrl = '/rest/user';  // URL to user call
  private countriesUrl = '/rest/country';  // URL to country call
  private userRatingUrl = '/rest/user/ratings';


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
        })
      }
      ).pipe(catchError(this.handleError<User[]>('getUsers', []))
    );
  }


  getRatingsForUser(): Observable<any[]> {

    return this.http.get<any[]>(this.userRatingUrl, {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
        })
      }

    ).pipe(catchError(this.handleError<any>('getRatingsForUser', []))
    );
  }


  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateUserRatings(ratings: any[], id: any) {
    const url = `${this.userRatingUrl}/${id}`;
    return this.http.put(url, ratings);
  }
}
