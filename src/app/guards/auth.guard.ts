import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AppService } from '../services/app.service';

export const authGuard: CanActivateFn = () => {
    const appService = inject(AppService);
    const router = inject(Router);

    if (!appService.currentUser) {
        void router.navigateByUrl('/login');
        return false;
    }
    return true;
};
