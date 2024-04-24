import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
    { path: 'login', loadChildren: () => import('./pages/log-in/log-in.module').then(m => m.LogInModule) },
    {
        path: 'vote',
        loadChildren: () => import('./pages/user-ratings/user-ratings.module').then(m => m.UserRatingsModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/esc-dashboard/esc-dashboard.module').then(m => m.EscDashboardModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'user-management',
        loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [AuthGuardService]
    },
    { path: '', redirectTo: 'vote', pathMatch: 'full' },
    { path: '**', redirectTo: 'vote' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
