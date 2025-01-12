import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
    ApplicationConfig,
    importProvidersFrom,
    inject,
    provideAppInitializer,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';

import { APP_ROUTES } from './app.routing';
import { AppService } from './services/app.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { UserInfoService } from './services/auth/user-info.service';

export const APP_CONFIG: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideRouter(APP_ROUTES, withHashLocation()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAppInitializer(() => {
            const userInfoService = inject(UserInfoService);
            const appService = inject(AppService);
            return firstValueFrom(
                userInfoService.userInfo$().pipe(tap((user) => (appService.currentUser = user))),
            ).catch(() => null);
        }),
    ],
};
