import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserTableComponent} from "./user-table/user-table.component";
import {LogInComponent} from "./log-in/log-in.component";
import {MainNavigationComponent} from "./main-navigation/main-navigation.component";
import {AuthGuardService} from "./auth-guard.service";
import {UserRatingsComponent} from "./user-ratings/user-ratings.component";

const routes: Routes = [
  {path: '', redirectTo: 'menu', pathMatch: "full"},
  {path: 'login', component: LogInComponent},
  {path: 'menu', component: MainNavigationComponent},
  {path: 'vote/:id', component: UserRatingsComponent},
  {path: 'menu/users1', component: UsersComponent, canActivate:[AuthGuardService]},
  {path: 'menu/users2', component: UserTableComponent, canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
