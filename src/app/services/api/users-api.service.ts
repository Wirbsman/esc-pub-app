import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { API_HOST, httpOptions } from '../../shared/constants/api';
import { EmptyResponseBody, SuccessResponseBody } from '../../shared/types/common-response.types';
import { AddUserBody, UpdateUserBodyWithId, User } from '../../shared/types/user.types';

type AllUsersResponse = SuccessResponseBody<ReadonlyArray<User>>;
type GetUserResponse = SuccessResponseBody<User>;
type AddUserResponse = SuccessResponseBody<User>;
type UpdateUserResponse = SuccessResponseBody<User>;
type DeleteUserResponse = EmptyResponseBody;

const API_BASE = 'api/v1/users';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
    private readonly endpointBase = [API_HOST, API_BASE].join('/');
    private readonly httpClient = inject(HttpClient);

    allUsers$(year: number): Observable<ReadonlyArray<User>> {
        return this.httpClient
            .get<AllUsersResponse>(this.endpointBase, { ...httpOptions, params: { year } })
            .pipe(
                map((res) => res.data ?? []),
                catchError(this.handleError('allUsers', [])),
            );
    }

    getUserById$(userId: string): Observable<User | null> {
        const endpoint = [this.endpointBase, userId].join('/');
        return this.httpClient.get<GetUserResponse>(endpoint, httpOptions).pipe(
            map((res) => res.data ?? null),
            catchError(this.handleError('getUserById', null)),
        );
    }

    async addUser(newUser: AddUserBody): Promise<User | null> {
        return lastValueFrom(
            this.httpClient.post<AddUserResponse>(this.endpointBase, newUser, httpOptions).pipe(
                map((res) => res.data ?? null),
                catchError(this.handleError('addUser', null)),
            ),
        );
    }

    async updateUser(user: UpdateUserBodyWithId): Promise<User | null> {
        const { id, ...updateBody } = user;
        return lastValueFrom(
            this.httpClient
                .put<UpdateUserResponse>(`${this.endpointBase}/${id}`, updateBody, httpOptions)
                .pipe(
                    map((res) => res.data ?? null),
                    catchError(this.handleError('deleteUser', null)),
                ),
        );
    }

    async deleteUser(userId: string): Promise<boolean> {
        return lastValueFrom(
            this.httpClient
                .delete<DeleteUserResponse>(`${this.endpointBase}/${userId}`, httpOptions)
                .pipe(
                    map((res) => !!res),
                    catchError(this.handleError('deleteUser', false)),
                ),
        );
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: unknown): Observable<T> => {
            console.error(operation, error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
