import { Component, inject, Input } from '@angular/core';
import { EscDashboardService } from '../esc-dashboard.service';

@Component({
    selector: 'app-user-average',
    template: `
        {{ value || '-' }}
    `,
})
export class UserAverageComponent {
    @Input() userId?: number;
    private readonly service = inject(EscDashboardService);

    get value(): string | undefined {
        return !!this.userId ? this.service.userAverageMap.get(this.userId) : undefined;
    }

}
