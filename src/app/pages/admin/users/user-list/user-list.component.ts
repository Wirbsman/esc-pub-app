import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { AdminRouting, AppRouting } from '../../../../routing.constants';
import { UserTileComponent } from '../user-tile/user-tile.component';
import { UserListService } from './user-list.service';

@Component({
    selector: 'app-user-list',
    imports: [HeaderComponent, FooterComponent, UserTileComponent],
    templateUrl: 'user-list.component.html',
    styleUrl: 'user-list.component.css',
    providers: [UserListService],
})
export default class UserListComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    protected readonly service = inject(UserListService);

    toEditor(userId?: string | null) {
        void this.router.navigate([userId ?? AdminRouting.NewSubPath], {
            relativeTo: this.route,
        });
    }

    toVoting() {
        void this.router.navigateByUrl(`/${AppRouting.Voting}`);
    }

    toCountryManagement() {
        void this.router.navigateByUrl(
            `/${AdminRouting.BasePath}/${AdminRouting.CountriesSubPath}`,
        );
    }
}
