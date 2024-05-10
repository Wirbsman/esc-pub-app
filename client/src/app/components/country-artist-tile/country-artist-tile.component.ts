import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CountryAndArtist } from '../../shared/types/country-and-artist.types';

@Component({
    selector: 'app-country-artist-tile',
    templateUrl: './country-artist-tile.component.html',
    styleUrls: ['./country-artist-tile.component.css'],
    standalone: true,
    imports: [NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryArtistTileComponent {
    readonly imagePath = 'assets/images/flags80/';

    @Input() countryAndArtist?: CountryAndArtist;
}
