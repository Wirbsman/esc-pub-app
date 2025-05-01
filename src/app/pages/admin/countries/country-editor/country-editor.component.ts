import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { COUNTRY_OPTIONS } from '../../../../shared/constants/countries.constants';
import { CountryFlagSrcPipe } from '../../../../shared/pipes/country-flag-src.pipe';
import { CountryEditorService } from './country-editor.service';

@Component({
    selector: 'app-country-editor',
    imports: [
        // frameworks
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatInput,
        // app
        HeaderComponent,
        FooterComponent,
        CountryFlagSrcPipe,
    ],
    templateUrl: 'country-editor.component.html',
    styleUrl: 'country-editor.component.css',
    providers: [CountryEditorService],
})
export default class CountryEditorComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    private readonly service = inject(CountryEditorService);

    protected readonly form = this.service.form;
    protected readonly OPTIONS = COUNTRY_OPTIONS;

    protected get countryId(): string | null {
        return this.service.countryId;
    }

    async save() {
        if (await this.service.save()) {
            this.leaveEditor();
        }
    }

    cancel() {
        this.leaveEditor();
    }

    async delete() {
        if (await this.service.delete()) {
            this.leaveEditor();
        }
    }

    private leaveEditor() {
        void this.router.navigate(['../'], { relativeTo: this.route });
    }
}
