import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AddUserBody, UpdateUserBodyWithId, User } from '../shared/types/user.types';
import { UsersApiService } from './api/users-api.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private readonly apiService = inject(UsersApiService);

    allUsers$(year: number): Observable<ReadonlyArray<User>> {
        return this.apiService.allUsers$(year);
    }

    getUserById$(userId: string): Observable<User | null> {
        return this.apiService.getUserById$(userId);
    }

    async addUser(newUser: AddUserBody): Promise<User | null> {
        return await this.apiService.addUser(newUser);
    }

    async updateUser(user: UpdateUserBodyWithId): Promise<User | null> {
        return await this.apiService.updateUser(user);
    }

    async deleteUser(userId: string): Promise<boolean> {
        return await this.apiService.deleteUser(userId);
    }
}
