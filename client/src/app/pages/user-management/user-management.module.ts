import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';


@NgModule({
    declarations: [UserManagementComponent],
    imports: [
        RouterModule.forChild([
            { path: '', component: UserManagementComponent }
        ]),

        CommonModule,
        ReactiveFormsModule
    ]
})
export class UserManagementModule {
}
