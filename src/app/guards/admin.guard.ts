import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AppService } from '../services/app.service';

export const adminGuard: CanActivateFn = async () => {
    const appService = inject(AppService);
    const router = inject(Router);

    const user = appService.currentUser;
    if (!user) {
        void router.navigateByUrl('/login');
        return false;
    }
    if (!user.admin) {
        void router.navigateByUrl('/vote');
        return false;
    }
    return true;
};
