import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserTableComponent} from "./user-table/user-table.component";
import {LogInComponent} from "./log-in/log-in.component";
import {MainNavigationComponent} from "./main-navigation/main-navigation.component";
import {AuthGuardService} from "./auth-guard.service";
import {UserRatingsComponent} from "./user-ratings/user-ratings.component";

const routes: Routes = [
  {path: '', redirectTo: 'vote', pathMatch: "full"},
  {path: 'login', component: LogInComponent},
  {path: 'vote', component: UserRatingsComponent, canActivate: [AuthGuardService]},
  // Not in Use at the moment
  {path: 'menu', component: MainNavigationComponent, canActivate: [AuthGuardService]},
  {path: 'menu/users2', component: UserTableComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
