import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LogInComponent } from './log-in.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: LogInComponent }
        ]),
    ]
})
export class LogInModule {
}
