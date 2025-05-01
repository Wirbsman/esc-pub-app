import { Routes } from '@angular/router';

import { AppRoutingParams } from '../../routing.constants';

const ROUTES: Routes = [
    {
        path: `:${AppRoutingParams.CountryIsoCode}`,
        loadComponent: () => import('./components/country-votes/country-votes.component'),
    },
    { path: '', loadComponent: () => import('./esc-dashboard.component') },
];

export default ROUTES;
