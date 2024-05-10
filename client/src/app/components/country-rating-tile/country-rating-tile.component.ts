import { Component, Input } from '@angular/core';

export type CountryUserRating = {
    name: string;
    rating: number
}

@Component({
    selector: 'app-country-rating-tile',
    templateUrl: './country-rating-tile.component.html',
    styleUrls: ['./country-rating-tile.component.css'],
})
export class CountryRatingTileComponent {
    @Input() countryRating?: CountryUserRating;
}
