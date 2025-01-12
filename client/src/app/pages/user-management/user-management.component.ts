import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../shared/types/user.types';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css'],
    imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class UserManagementComponent implements OnInit, OnDestroy {
    users: ReadonlyArray<User> = [];

    readonly form = new FormGroup({
        id: new FormControl<number | null>(null), // is null for new users
        name: new FormControl<string | null>(null, {
            validators: [Validators.required],
            nonNullable: true,
        }),
        icon: new FormControl<string | null>(null),
        admin: new FormControl<boolean>(false, {
            validators: [Validators.required],
            nonNullable: true,
        }),
        password: new FormControl<string | null>(null),
    });

    private readonly triggerReload$ = new Subject<void>();
    private readonly destroyed$ = new Subject<void>();

    constructor(
        private userService: UserService,
        private router: Router,
    ) {
        this.triggerReload$
            .pipe(
                takeUntil(this.destroyed$),
                switchMap(() => this.userService.allUsers$()),
            )
            .subscribe((users) => (this.users = users));
    }

    get selectedUserId(): number | null {
        return this.form.value.id ?? null;
    }

    get isAddUserActive(): boolean {
        return this.form.valid && !this.selectedUserId;
    }

    get isUpdateUserActive(): boolean {
        return this.form.valid && !!this.selectedUserId;
    }

    get isDeleteUserActive(): boolean {
        return !!this.selectedUserId;
    }

    ngOnInit() {
        this.triggerReload$.next();
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    toVote(): void {
        void this.router.navigateByUrl('/vote');
    }

    reload() {
        this.triggerReload$.next();
    }

    selectUser(user: User) {
        this.form.patchValue(user);
    }

    async removeUser() {
        if (!this.form.valid || !this.selectedUserId) {
            return;
        }

        await this.userService.deleteUser(this.selectedUserId);

        this.reset();
    }

    async addUser() {
        if (!this.form.valid) {
            return;
        }

        const { name, icon, password, admin } = this.form.value;
        if (!name || !password) {
            return;
        }

        await this.userService.addUser({
            name,
            icon: icon ?? undefined,
            admin: admin ?? false,
            password,
        });

        this.reset();
    }

    async updateUser() {
        if (!this.form.valid || !this.selectedUserId) {
            return;
        }

        const { name, icon, admin } = this.form.value;
        if (!name) {
            return;
        }

        await this.userService.updateUser({
            id: this.selectedUserId,
            name,
            icon: icon ?? undefined,
            admin: admin ?? false,
            // TODO: password stuff
        });

        this.reset();
    }

    private reset() {
        this.form.reset();
        this.reload();
    }
}
