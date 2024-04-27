import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { LogInComponent } from './log-in.component';

@NgModule({
    declarations: [LogInComponent],
    imports: [
        RouterModule.forChild([
            { path: '', component: LogInComponent }
        ]),

        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class LogInModule {
}
