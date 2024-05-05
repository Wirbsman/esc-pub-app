import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';

import { APP_ROUTES } from './app.routing';
import { AuthInterceptor } from './services/auth/auth.interceptor';

export const APP_CONFIG: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideRouter(APP_ROUTES, withHashLocation()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
};
