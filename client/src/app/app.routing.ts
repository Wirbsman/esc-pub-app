import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const CountryRoutingParam = {
    Flag: 'flag',
};

export const APP_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/log-in/log-in.component').then((c) => c.LogInComponent),
    },
    {
        path: 'sign-up/simple',
        loadComponent: () =>
            import('./pages/simple-signup/simple-signup.component').then(
                (m) => m.SimpleSignupComponent,
            ),
    },
    {
        path: 'vote',
        loadComponent: () =>
            import('./pages/user-ratings/user-ratings.component').then(
                (m) => m.UserRatingsComponent,
            ),
        canActivate: [authGuard],
    },
    {
        path: `dashboard/:${CountryRoutingParam.Flag}`,
        loadComponent: () =>
            import('./pages/esc-dashboard/components/country-votes/country-votes.component').then(
                (m) => m.CountryVotesComponent,
            ),
        canActivate: [authGuard],
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/esc-dashboard/esc-dashboard.component').then(
                (m) => m.EscDashboardComponent,
            ),
        canActivate: [authGuard],
    },
    {
        path: 'user-management',
        loadComponent: () =>
            import('./pages/user-management/user-management.component').then(
                (m) => m.UserManagementComponent,
            ),
        canActivate: [adminGuard],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'vote' },
];
