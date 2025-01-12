import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    filter,
    firstValueFrom,
    map,
    Observable,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs';
import { User } from '../shared/types/user.types';
import { UserInfoService } from './auth/user-info.service';

@Injectable({ providedIn: 'root' })
export class AppService {
    private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(false);

    private readonly _currentUser$ = this._isLoggedIn$.pipe(
        filter((isLoggedIn) => isLoggedIn),
        switchMap(() => this.userInfoService.userInfo$()),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly router: Router,
    ) {}

    get isLoggedIn(): boolean {
        return this._isLoggedIn$.value;
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn$.next(value);
    }

    get currentUser$(): Observable<User | null> {
        return this._currentUser$;
    }

    get isAdmin$(): Observable<boolean> {
        return this.currentUser$.pipe(map((user) => !!user?.admin));
    }

    init() {
        void firstValueFrom(
            this.userInfoService.userInfo$().pipe(
                tap((user) => (this.isLoggedIn = !!user)),
                tap(() => this.isLoggedIn && this.router.navigateByUrl('/vote')),
            ),
        );
    }
}
