import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { UserRatingsComponent } from './user-ratings.component';


@NgModule({
    declarations: [UserRatingsComponent],
    imports: [
        RouterModule.forChild([
            { path: '', component: UserRatingsComponent }
        ]),
        CommonModule,
        FormsModule,
        MatSelectModule
    ]
})
export class UserRatingsModule {
}
