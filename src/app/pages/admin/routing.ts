import { Routes } from '@angular/router';

const ROUTES: Routes = [
    { path: 'users', loadComponent: () => import('./user-management/user-management.component') },
    { path: '', pathMatch: 'full', redirectTo: '/' },
];

export default ROUTES;
