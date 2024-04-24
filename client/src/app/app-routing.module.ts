import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserRatingsComponent } from './user-ratings/user-ratings.component';
import { EscDashboardComponent } from './esc-dashboard/esc-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';


const routes: Routes = [
    { path: '', redirectTo: 'vote', pathMatch: 'full' },
    { path: 'login', component: LogInComponent },
    { path: 'vote', component: UserRatingsComponent, canActivate: [AuthGuardService] },
    { path: 'dashboard', component: EscDashboardComponent, canActivate: [AuthGuardService] },
    { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: 'vote' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
