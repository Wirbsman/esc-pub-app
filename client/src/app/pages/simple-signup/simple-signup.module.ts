import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SimpleSignupComponent } from './simple-signup.component';


@NgModule({
    declarations: [SimpleSignupComponent],
    imports: [
        RouterModule.forChild([
            { path: '', component: SimpleSignupComponent }
        ]),

        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class SimpleSignupModule {
}
