import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { API_HOST, httpOptions } from '../../shared/constants/api';
import { SuccessResponseBody } from '../../shared/types/common-response.types';
import { User } from '../../shared/types/user.types';

const API_BASE = 'api/auth';

@Injectable({ providedIn: 'root' })
export class UserInfoService {

    constructor(private readonly httpClient: HttpClient) {
    }

    userInfo$(): Observable<User | null> {
        return this.httpClient.get<SuccessResponseBody<User>>([API_HOST, API_BASE, 'user-info'].join('/'), httpOptions).pipe(
            map(res => res.data ?? null),
            catchError(() => of(null))
        );
    }
}
