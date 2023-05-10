import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserTableComponent} from "./user-table/user-table.component";
import {LogInComponent} from "./log-in/log-in.component";
import {MainNavigationComponent} from "./main-navigation/main-navigation.component";
import {AuthGuardService} from "./auth-guard.service";
import {UserRatingsComponent} from "./user-ratings/user-ratings.component";
import {EscDashboardComponent} from "./esc-dashboard/esc-dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'vote', pathMatch: 'full'},
  {path: 'login', component: LogInComponent},
  {path: 'vote', component: UserRatingsComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard', component: EscDashboardComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: 'vote'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
