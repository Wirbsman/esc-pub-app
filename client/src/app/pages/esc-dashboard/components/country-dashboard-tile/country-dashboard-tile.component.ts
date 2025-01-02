import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { CountryArtistTileComponent } from '../../../../components/country-artist-tile/country-artist-tile.component';
import { CountryAndArtist } from '../../../../shared/types/country-and-artist.types';
import { Country } from '../../../../shared/types/country.types';
import { EscDashboardService } from '../../esc-dashboard.service';

@Component({
    selector: 'app-country-dashboard-tile',
    templateUrl: './country-dashboard-tile.component.html',
    styles: [`
        .country-stats {
            min-width: 50px;
            text-align: right;
        }

        .country-avg {
            font-weight: 500;
            font-size: 16px;
        }
    `],
    imports: [NgIf, CountryArtistTileComponent]
})
export class CountryDashboardTileComponent {

    private readonly dashboardService = inject(EscDashboardService);

    private _country?: Country;

    get countryAndArtist(): CountryAndArtist | undefined {
        if (!this.country) {
            return undefined;
        }
        const { name, flag, interpret: artistName, songname: artistSong } = this.country;
        return { name, flag, artistName, artistSong };
    }

    get country(): Country | undefined {
        return this._country;
    }

    @Input() set country(country: Country | undefined) {
        this._country = country;
    }

    get countryAverage(): string | undefined {
        return !this.country ? undefined : this.dashboardService.countryAverageMap.get(this.country.id);
    }
}
