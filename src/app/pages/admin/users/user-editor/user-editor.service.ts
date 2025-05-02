import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, switchMap } from 'rxjs';

import { AppRoutingParams } from '../../../../routing.constants';
import { UsersService } from '../../../../services/users.service';
import { isDefined } from '../../../../shared/utils/is-defined.utils';

const pwValidators: ValidatorFn[] = [Validators.required, Validators.minLength(5)];

// const pwEqualValidator = (group: (typeof UserEditorService)['form']): ValidationErrors | null => {
//     const newPassword = group.controls.newPassword.value;
//     const confirmPassword = group.controls.confirmPassword.value;
//
//     if (!newPassword || !confirmPassword) {
//         return null;
//     }
// };

@Injectable()
export class UserEditorService {
    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);

    private readonly usersService = inject(UsersService);

    private readonly _userId$ = new BehaviorSubject<string | null>(null);

    readonly isAdmin = signal<boolean>(false);

    get userId(): string | null {
        return this._userId$.value;
    }

    readonly form = this.fb.group({
        name: this.fb.control<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        icon: this.fb.control<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        admin: this.fb.control<boolean>(false, {
            validators: [Validators.required],
            nonNullable: true,
        }),
        password: this.fb.control<string | null>(null, pwValidators),
        // newPassword: this.fb.control<string | null>(null),
        // confirmPassword: this.fb.control<string | null>(null),
    });

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((paramMap) => {
            this._userId$.next(paramMap.get(AppRoutingParams.UserId));
        });

        this._userId$
            .pipe(
                takeUntilDestroyed(),
                filter(isDefined),
                switchMap((userId) => this.usersService.getUserById$(userId)),
            )
            .subscribe((user) => {
                if (!isDefined(user)) {
                    return;
                }

                this.form.controls.password.removeValidators(Validators.required);
                this.form.controls.password.updateValueAndValidity();
                // this.form.controls.newPassword.addValidators(pwValidators);
                // this.form.controls.confirmPassword.addValidators(pwValidators);
                // this.form.addValidators(pwEqualValidator);

                const { name, icon, admin } = user;

                this.isAdmin.set(admin);
                this.form.patchValue({ name, icon, admin });
            });
    }

    async save(): Promise<boolean> {
        if (this.userId) {
            return await this.updateUser();
        } else {
            return await this.addUser();
        }
    }

    async delete(): Promise<boolean> {
        if (!isDefined(this.userId)) {
            return false;
        }

        await this.usersService.deleteUser(this.userId);
        return true;
    }

    private async addUser(): Promise<boolean> {
        const { name, icon, admin, password } = this.form.value as Required<typeof this.form.value>;

        if (!this.form.valid || !password) {
            this.form.markAllAsTouched();
            return false;
        }

        await this.usersService.addUser({
            name,
            icon,
            admin,
            password,
        });

        return true;
    }

    private async updateUser(): Promise<boolean> {
        if (!this.form.valid || !this.userId) {
            this.form.markAllAsTouched();
            return false;
        }

        const { name, icon, admin, password } = this.form.value as Required<typeof this.form.value>;

        await this.usersService.updateUser({
            id: this.userId,
            name,
            icon,
            admin,
            newPassword: password ?? undefined,
        });

        return true;
    }
}
