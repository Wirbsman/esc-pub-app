import { Routes } from '@angular/router';
import { AdminRouting } from '../../routing.constants';

const ROUTES: Routes = [
    {
        path: `${AdminRouting.UsersSubPath}`,
        loadComponent: () => import('./user-management/user-management.component'),
    },
    {
        path: `${AdminRouting.CountriesSubPath}`,
        loadChildren: () => import('./countries/routing'),
    },
    { path: '', pathMatch: 'full', redirectTo: `${AdminRouting.CountriesSubPath}` },
];

export default ROUTES;
