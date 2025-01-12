/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppService } from '../app.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly appService = inject(AppService);
    private readonly router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // attach httponly cookies to every request
        req = req.clone({
            withCredentials: true,
        });
        return next.handle(req).pipe(catchError((err) => this.handleError(err)));
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.appService.currentUser = null;
            void this.router.navigateByUrl('/');
            return of(err.message);
        }
        // handle your auth error or rethrow
        return throwError(() => err);
    }
}
