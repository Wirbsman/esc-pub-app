import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API_HOST, httpOptions } from '../../shared/constants/api';
import { EmptyResponseBody, SuccessResponseBody } from '../../shared/types/common-response.types';
import { User } from '../../shared/types/user.types';

export type LoginRequestBody = {
    username: string;
    password: string;
};

export type SimpleSignupRequestBody = Pick<LoginRequestBody, 'username'>;

const API_BASE = 'api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly endpointBase = [API_HOST, API_BASE].join('/');

    constructor(private readonly httpClient: HttpClient) {}

    login$(body: LoginRequestBody): Observable<User | null> {
        return this.httpClient
            .post<SuccessResponseBody<User>>(`${this.endpointBase}/login`, body, httpOptions)
            .pipe(map((res) => res.data ?? null));
    }

    simpleSignUp$(body: SimpleSignupRequestBody): Observable<User | null> {
        return this.httpClient
            .post<
                SuccessResponseBody<User>
            >(`${this.endpointBase}/simple-signup`, body, httpOptions)
            .pipe(map((res) => res.data ?? null));
    }

    logout$() {
        return this.httpClient.post<EmptyResponseBody>(
            `${this.endpointBase}/logout`,
            undefined,
            httpOptions,
        );
    }
}
