import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserRatingTileComponent } from './user-rating-tile/user-rating-tile.component';
import { UserRatingsComponent } from './user-ratings.component';

@NgModule({
    declarations: [UserRatingsComponent],
    imports: [
        RouterModule.forChild([
            { path: '', component: UserRatingsComponent }
        ]),
        CommonModule,

        UserRatingTileComponent
    ]
})
export class UserRatingsModule {
}
