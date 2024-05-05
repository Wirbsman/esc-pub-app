import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
    { path: 'login', loadChildren: () => import('./pages/log-in/log-in.module').then(m => m.LogInModule) },
    { path: 'sign-up/simple', loadChildren: () => import('./pages/simple-signup/simple-signup.module').then(m => m.SimpleSignupModule) },
    {
        path: 'vote',
        loadChildren: () => import('./pages/user-ratings/user-ratings.module').then(m => m.UserRatingsModule),
        canActivate: [authGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/esc-dashboard/esc-dashboard.module').then(m => m.EscDashboardModule),
        canActivate: [authGuard]
    },
    {
        path: 'user-management',
        loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [adminGuard]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'vote' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
