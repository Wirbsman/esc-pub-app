import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimpleSignupComponent } from './simple-signup.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: SimpleSignupComponent }
        ]),
    ]
})
export class SimpleSignupModule {
}
