import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_HOST, httpOptions } from '../../shared/constants/api';
import { EmptyResponseBody } from '../../shared/types/common-response.types';

export type LoginRequestBody = {
    username: string;
    password: string;
}

export type SimpleSignupRequestBody = Pick<LoginRequestBody, 'username'>;

const API_BASE = 'api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly endpointBase = [API_HOST, API_BASE].join('/');

    constructor(private readonly httpClient: HttpClient) {
    }

    login$(body: LoginRequestBody): Observable<EmptyResponseBody> {
        return this.httpClient.post<EmptyResponseBody>(`${this.endpointBase}/login`, body, httpOptions);
    }

    simpleSignUp$(body: SimpleSignupRequestBody): Observable<EmptyResponseBody> {
        return this.httpClient.post<EmptyResponseBody>(`${this.endpointBase}/simple-signup`, body, httpOptions);
    }

    logout$() {
        return this.httpClient.post<EmptyResponseBody>(`${this.endpointBase}/logout`, undefined, httpOptions);
    }
}
