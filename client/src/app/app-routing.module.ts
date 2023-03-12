import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserTableComponent} from "./user-table/user-table.component";

const routes: Routes = [
  {path: 'users1', component: UsersComponent},
  {path: 'users2', component: UserTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
