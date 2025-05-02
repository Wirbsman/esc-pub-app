import { Component, computed, input } from '@angular/core';
import { User } from '../../../../shared/types/user.types';

@Component({
    selector: 'app-user-tile',
    imports: [],
    templateUrl: 'user-tile.component.html',
    styleUrl: 'user-tile.component.css',
})
export class UserTileComponent {
    readonly user = input.required<User | null>();

    protected readonly status = computed(() => (!!this.user()?.admin ? 'Admin' : 'User'));
}
