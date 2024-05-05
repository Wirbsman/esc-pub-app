import { Component, inject, Input } from '@angular/core';
import { EscDashboardService } from '../esc-dashboard.service';

@Component({
    selector: 'app-user-rating',
    template: `
        {{ value | formatRating }}
    `,
})
export class UserRatingComponent {
    @Input() userId!: number;
    @Input() countryId!: number;

    private readonly service = inject(EscDashboardService);

    get value(): number | undefined {
        return this.service.ratings.find(
            (rating) => rating.countryId === this.countryId && rating.userId === this.userId
        )?.rating;
    }
}
