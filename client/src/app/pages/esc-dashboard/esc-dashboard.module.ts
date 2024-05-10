import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { CountryRatingTileComponent } from '../../components/country-rating-tile/country-rating-tile.component';
import { CountryAverageComponent } from './components/country-average.component';
import { CountryDashboardTileComponent } from './components/country-dashboard-tile/country-dashboard-tile.component';
import { CountryVotesComponent } from './components/country-votes/country-votes.component';
import { UserAverageComponent } from './components/user-average.component';
import { UserRatingComponent } from './components/user-rating.component';
import { EscDashboardComponent } from './esc-dashboard.component';
import { FormatRatingPipe } from './pipes/format-rating.pipe';

export const CountryRoutingParam = {
    Flag: 'Flag'
};

@NgModule({
    declarations: [EscDashboardComponent, UserRatingComponent, UserAverageComponent, CountryAverageComponent, FormatRatingPipe, CountryRatingTileComponent, CountryVotesComponent],
    imports: [
        RouterModule.forChild([
            { path: `:${CountryRoutingParam.Flag}`, component: CountryVotesComponent },
            { path: '', component: EscDashboardComponent }
        ]),

        CommonModule,
        MatButtonModule,

        CountryDashboardTileComponent
    ]
})
export class EscDashboardModule {
}
