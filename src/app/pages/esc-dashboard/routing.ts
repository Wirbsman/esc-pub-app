import { Routes } from '@angular/router';

export const CountryRoutingParam = {
    CountryIsoCode: 'countryIsoCode',
};

const ROUTES: Routes = [
    {
        path: `${CountryRoutingParam.CountryIsoCode}`,
        loadComponent: () => import('./components/country-votes/country-votes.component'),
    },
    { path: '', loadComponent: () => import('./esc-dashboard.component') },
];

export default ROUTES;
