import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/log-in/log-in.component'),
    },
    {
        path: 'sign-up/simple',
        loadComponent: () => import('./pages/simple-signup/simple-signup.component'),
    },
    {
        path: 'vote',
        loadComponent: () => import('./pages/user-ratings/user-ratings.component'),
        canActivate: [authGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/esc-dashboard/routing'),
        canActivate: [authGuard],
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/routing'),
        canActivate: [adminGuard],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'vote' },
];
