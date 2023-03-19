import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User} from "./user";
import {Ratings} from "./user-ratings/ratings";


const baseUrl = 'http://localhost:8090/ratings';

@Injectable({
  providedIn: 'root'
})

export class EscService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  private usersUrl = '/member';  // URL to user call
  private countriesUrl = '/countries';  // URL to country call
  private userRatingUrl = '/ratings';  // URL to country call



  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(catchError(this.handleError<User[]>('getUsers', []))
    ); }


  getRatingsForUser(id: any): Observable<Ratings[]>{
    const url = `${this.userRatingUrl}/${id}`;
    return this.http.get<Ratings[]>(url);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


/** Get Ratings by UserID
getRatings(id: any): Observable<Ratings[]> {
  const url = `${this.userRatingUrl}/${id}`;
  return this.http.get<Ratings[]>(url).pipe(catchError(this.handleError<Ratings[]>(`getRatings userId=${id}`))
  );
}*/
}
