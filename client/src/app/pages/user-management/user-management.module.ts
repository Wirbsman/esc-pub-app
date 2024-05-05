import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: UserManagementComponent }
        ]),
    ]
})
export class UserManagementModule {
}
