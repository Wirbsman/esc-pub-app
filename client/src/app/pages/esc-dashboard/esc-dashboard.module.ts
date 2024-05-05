import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { CountryAverageComponent } from './components/country-average.component';
import { UserAverageComponent } from './components/user-average.component';
import { UserRatingComponent } from './components/user-rating.component';
import { EscDashboardComponent } from './esc-dashboard.component';
import { FormatRatingPipe } from './pipes/format-rating.pipe';


@NgModule({
    declarations: [EscDashboardComponent, UserRatingComponent, UserAverageComponent, CountryAverageComponent, FormatRatingPipe],
    imports: [
        RouterModule.forChild([
            { path: '', component: EscDashboardComponent }
        ]),

        CommonModule,
        MatButtonModule
    ]
})
export class EscDashboardModule {
}
