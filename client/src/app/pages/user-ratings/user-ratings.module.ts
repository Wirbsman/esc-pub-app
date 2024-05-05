import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserRatingsComponent } from './user-ratings.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: UserRatingsComponent }
        ]),
    ]
})
export class UserRatingsModule {
}
