import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscDashboardComponent } from './pages/esc-dashboard/esc-dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserRatingsComponent } from './pages/user-ratings/user-ratings.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
    { path: 'login', loadChildren: () => import('./pages/log-in/log-in.module').then(m => m.LogInModule) },
    { path: 'vote', component: UserRatingsComponent, canActivate: [AuthGuardService] },
    { path: 'dashboard', component: EscDashboardComponent, canActivate: [AuthGuardService] },
    { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuardService] },
    { path: '', redirectTo: 'vote', pathMatch: 'full' },
    { path: '**', redirectTo: 'vote' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
