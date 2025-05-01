import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { AdminRouting, AppRouting } from './routing.constants';

export const APP_ROUTES: Routes = [
    {
        path: `${AppRouting.Login}`,
        loadComponent: () => import('./pages/log-in/log-in.component'),
    },
    {
        path: `${AppRouting.SimpleSignUp}`,
        loadComponent: () => import('./pages/simple-signup/simple-signup.component'),
    },
    {
        path: `${AppRouting.Voting}`,
        loadComponent: () => import('./pages/user-ratings/user-ratings.component'),
        canActivate: [authGuard],
    },
    {
        path: `${AppRouting.Dashboard}`,
        loadChildren: () => import('./pages/esc-dashboard/routing'),
        canActivate: [authGuard],
    },
    {
        path: `${AdminRouting.BasePath}`,
        loadChildren: () => import('./pages/admin/routing'),
        canActivate: [adminGuard],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'vote' },
];
