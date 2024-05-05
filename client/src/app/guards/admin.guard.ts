import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserInfoService } from '../services/auth/user-info.service';

export const adminGuard: CanActivateFn = async () => {
    const userInfoService = inject(UserInfoService);
    const router = inject(Router);

    const user = await lastValueFrom(userInfoService.userInfo$());
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
