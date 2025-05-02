import { Routes } from '@angular/router';
import { AdminRouting } from '../../routing.constants';

const ROUTES: Routes = [
    {
        path: `${AdminRouting.UsersSubPath}`,
        loadChildren: () => import('./users/routing'),
    },
    {
        path: `${AdminRouting.CountriesSubPath}`,
        loadChildren: () => import('./countries/routing'),
    },
    { path: '', pathMatch: 'full', redirectTo: `${AdminRouting.CountriesSubPath}` },
];

export default ROUTES;
