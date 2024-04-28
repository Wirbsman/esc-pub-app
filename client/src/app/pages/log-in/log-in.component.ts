import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { AppService } from '../../services/app.service';
import { AuthService, LoginRequestBody } from '../../services/auth/auth.service';
import { FormData } from '../../shared/types/form.types';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnDestroy {

    readonly loginForm = new FormGroup<FormData<LoginRequestBody>>({
        username: new FormControl<string>('', {
            validators: [Validators.required, Validators.minLength(3)],
            nonNullable: true
        }),
        password: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true
        })
    });

    public invalidLogin = false;
    public hide = true;

    private readonly destroyed$ = new Subject<void>();

    constructor(private readonly appService: AppService, private readonly router: Router, private readonly authService: AuthService) {
        if (this.appService.isLoggedIn) {
            this.navigateToVote();
        }
    }

    login() {
        if (!this.loginForm.valid || !this.loginForm.value.username || !this.loginForm.value.password) {
            return;
        }

        try {
            lastValueFrom(this.authService.login$({
                username: this.loginForm.value.username,
                password: this.loginForm.value.password
            })).then(() => {
                this.invalidLogin = false;
                this.appService.isLoggedIn = true;
                this.navigateToVote();
            }).catch((e) => {
                console.error(e);
                this.appService.isLoggedIn = false;
                this.invalidLogin = true;
            });
        } catch (e) {
            console.error(e);
            this.appService.isLoggedIn = false;
            this.invalidLogin = true;
        }
    }

    private navigateToVote() {
        void this.router.navigateByUrl('/vote');
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }
}
