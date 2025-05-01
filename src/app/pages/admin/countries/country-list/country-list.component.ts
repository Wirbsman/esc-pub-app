import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CountryArtistTileComponent } from '../../../../components/country-artist-tile/country-artist-tile.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { AdminRouting, AppRouting } from '../../../../routing.constants';
import { CountryListService } from './country-list.service';

@Component({
    selector: 'app-country-list',
    imports: [AsyncPipe, HeaderComponent, CountryArtistTileComponent, FooterComponent],
    templateUrl: 'country-list.component.html',
    styleUrl: 'country-list.component.css',
    providers: [CountryListService],
})
export default class CountryListComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    protected readonly service = inject(CountryListService);

    toEditor(countryId?: string | null) {
        void this.router.navigate([countryId ?? AdminRouting.NewSubPath], {
            relativeTo: this.route,
        });
    }

    toVoting() {
        void this.router.navigateByUrl(`/${AppRouting.Voting}`);
    }

    toUserManagement() {
        void this.router.navigateByUrl(`/${AdminRouting.BasePath}/${AdminRouting.UsersSubPath}`);
    }
}
