import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CurrentUser} from "../current-user";
import {Rating} from "../user-ratings/ratings";


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

  private userRatingUrl = '/rest/user/ratings';
  private allRatingsUrl = '/rest/ratings';


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

  updateUserRatings(ratings: Rating[]): Observable<void> {

    return this.http.put(this.userRatingUrl, ratings, {
      headers: new HttpHeaders({
        CONTENT_TYPE_HEADER: CONTENT_TYPE,
        AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
      })
    }).pipe(catchError(this.handleError<any>('getRatingsForUser', [])));
  }


  public handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllRatings(): Observable<any> {

    return this.http.get<any>(this.allRatingsUrl, {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
        })
      }
    ).pipe(catchError(this.handleError<any>('getAllRatings', {}))
    );
  }


}
