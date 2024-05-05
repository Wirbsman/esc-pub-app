import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FormatRatingPipe } from '../../pages/esc-dashboard/pipes/format-rating.pipe';

export type CountryUserRating = {
    name: string;
    rating: number
}

@Component({
    selector: 'app-country-rating-tile',
    templateUrl: './country-rating-tile.component.html',
    styleUrls: ['./country-rating-tile.component.css'],
    imports: [NgIf, FormatRatingPipe],
    standalone: true
})
export class CountryRatingTileComponent {
    @Input() countryRating?: CountryUserRating;
}
