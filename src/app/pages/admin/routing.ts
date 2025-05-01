import { Routes } from '@angular/router';
import { AdminRouting } from '../../routing.constants';

const ROUTES: Routes = [
    {
        path: `${AdminRouting.UsersSubPath}`,
        loadComponent: () => import('./user-management/user-management.component'),
    },
    { path: '', pathMatch: 'full', redirectTo: `${AdminRouting.ParticipantsSubPath}` },
];

export default ROUTES;
