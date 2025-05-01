import { Routes } from '@angular/router';

import { AdminRouting, AppRoutingParams } from '../../../routing.constants';

const ROUTES: Routes = [
    {
        path: `:${AppRoutingParams.CurrentYear}`,
        children: [
            {
                path: `${AdminRouting.NewSubPath}`,
                loadComponent: () => import('./country-editor/country-editor.component'),
            },
            {
                path: `:${AppRoutingParams.CountryId}`,
                loadComponent: () => import('./country-editor/country-editor.component'),
            },
            { path: '', loadComponent: () => import('./country-list/country-list.component') },
        ],
    },
    {
        path: ``,
        pathMatch: 'full',
        redirectTo: `${new Date().getFullYear()}`,
    },
];

export default ROUTES;
