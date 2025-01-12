import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-simple-signup',
    templateUrl: './simple-signup.component.html',
    styleUrls: ['../log-in/log-in.component.css'],
    imports: [
        NgIf,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        MatButton,
    ],
})
export class SimpleSignupComponent {
    readonly usernameFC = new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
    });

    public invalidLogin = false;

    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {}

    signUp() {
        if (!this.usernameFC.valid || !this.usernameFC.value) {
            return;
        }

        try {
            lastValueFrom(
                this.authService.simpleSignUp$({
                    username: this.usernameFC.value,
                }),
            )
                .then((user) => {
                    this.invalidLogin = !user;
                    this.appService.currentUser = user;
                    void this.router.navigateByUrl('/vote');
                })
                .catch((e) => {
                    console.error(e);
                    this.appService.currentUser = null;
                    this.invalidLogin = true;
                });
        } catch (e) {
            console.error(e);
            this.appService.currentUser = null;
            this.invalidLogin = true;
        }
    }
}
