import { Routes } from '@angular/router';

import { AdminRouting, AppRoutingParams } from '../../../routing.constants';

const ROUTES: Routes = [
    {
        path: `${AdminRouting.NewSubPath}`,
        loadComponent: () => import('./user-editor/user-editor.component'),
    },
    {
        path: `:${AppRoutingParams.UserId}`,
        loadComponent: () => import('./user-editor/user-editor.component'),
    },
    {
        path: '',
        loadComponent: () => import('./user-list/user-list.component'),
    },
];

export default ROUTES;
