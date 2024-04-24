import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUser} from "../current-user";
import {User} from "../user-management/user";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

const CONTENT_TYPE = 'application/json'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private currentUser: CurrentUser) {
  }

  private allUsersUrl = '/rest/user/all';
  private userUrl: string = '/rest/user';

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.allUsersUrl, {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
        })
      }
    ).pipe(catchError(this.handleError<any>('getUsers', {}))
    );
  }

  deleteUser(userId: number): Observable<any> {

    const deleteUrl = `${this.userUrl}/${userId}`;

    return this.http.delete<User>(deleteUrl, {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
        })
      }
    ).pipe(catchError(this.handleError<any>('deleteUser'))
    );
  }

  addUser(user: User): Observable<any> {

    return this.http.post<User>(this.userUrl, user, {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
        })
      }
    ).pipe(catchError(this.handleError<any>('addUser', {}))
    );

  }

  updateUser(userId: number, user: User): Observable<any> {

    const updateUrl = `${this.userUrl}/${userId}`;

    return this.http.put(updateUrl, user, {
        headers: new HttpHeaders({
          CONTENT_TYPE_HEADER: CONTENT_TYPE,
          AUTHORIZATION: `Basic ${this.currentUser.getCredentials()}`
        })
      }
    ).pipe(catchError(this.handleError<any>('updateUser', {}))
    );
  }

  public handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
