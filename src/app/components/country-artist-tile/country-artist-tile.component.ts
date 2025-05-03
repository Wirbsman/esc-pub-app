import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CountryFlagSrcPipe } from '../../shared/pipes/country-flag-src.pipe';
import { CountryAndArtist } from '../../shared/types/country-and-artist.types';

@Component({
    selector: 'app-country-artist-tile',
    templateUrl: './country-artist-tile.component.html',
    styleUrls: ['./country-artist-tile.component.css'],
    imports: [NgIf, CountryFlagSrcPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryArtistTileComponent {
    @Input() countryAndArtist?: CountryAndArtist;
}
