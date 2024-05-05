import { Component, inject, Input } from '@angular/core';

import { EscDashboardService } from '../esc-dashboard.service';

@Component({
    selector: 'app-country-average',
    template: `
        {{ value || '-' }}
    `,
})
export class CountryAverageComponent {
    @Input() countryId?: number;
    private readonly service = inject(EscDashboardService);

    get value(): string | undefined {
        return !!this.countryId ? this.service.countryAverageMap.get(this.countryId) : undefined;
    }
}
