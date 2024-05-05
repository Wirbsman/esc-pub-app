import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CountryVotesComponent } from './components/country-votes/country-votes.component';
import { EscDashboardComponent } from './esc-dashboard.component';

export const CountryRoutingParam = {
    Flag: 'Flag'
};

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: `:${CountryRoutingParam.Flag}`, component: CountryVotesComponent },
            { path: '', component: EscDashboardComponent }
        ]),
    ]
})
export class EscDashboardModule {
}
