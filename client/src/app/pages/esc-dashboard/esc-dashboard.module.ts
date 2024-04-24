import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EscDashboardComponent } from './esc-dashboard.component';


@NgModule({
    declarations: [EscDashboardComponent],
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
