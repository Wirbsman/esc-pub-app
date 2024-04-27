import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService, LoginRequestBody } from '../../services/auth/auth.service';
import { FormData } from '../../shared/types/form.types';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

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

    constructor(private readonly router: Router, private readonly authService: AuthService) {
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
                void this.router.navigateByUrl('/vote');
            }).catch((e) => {
                console.error(e);
                this.invalidLogin = true;
            });
        } catch (e) {
            console.error(e);
            this.invalidLogin = true;
        }
    }
}
