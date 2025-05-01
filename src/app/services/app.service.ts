import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { User } from '../shared/types/user.types';

@Injectable({ providedIn: 'root' })
export class AppService {
    private readonly _currentUser$ = new BehaviorSubject<User | null>(null);
    private readonly _currentYear$ = new BehaviorSubject<number>(new Date().getFullYear());
    readonly currentUser$ = this._currentUser$.asObservable().pipe(distinctUntilChanged());

    get isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    get currentUser(): User | null {
        return this._currentUser$.value;
    }

    set currentUser(value: User | null) {
        this._currentUser$.next(value);
    }

    get isAdmin$(): Observable<boolean> {
        return this.currentUser$.pipe(map((user) => !!user?.admin));
    }

    get currentYear(): number {
        return this._currentYear$.value;
    }
}
