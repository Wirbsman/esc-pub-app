import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { AppService } from '../../../../services/app.service';
import { UsersService } from '../../../../services/users.service';
import { sortByAdminAndNameAsc } from '../../../../shared/utils/users.utils';

@Injectable()
export class UserListService {
    private readonly appService = inject(AppService);
    private readonly usersService = inject(UsersService);

    readonly users = toSignal(
        this.usersService.allUsers$(this.appService.currentYear).pipe(
            takeUntilDestroyed(),
            map((users) => [...users].sort(sortByAdminAndNameAsc)),
        ),
        { initialValue: [] },
    );
}
