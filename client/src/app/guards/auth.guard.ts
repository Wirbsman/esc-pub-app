import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserInfoService } from '../services/auth/user-info.service';

export const authGuard: CanActivateFn = async () => {
    const router = inject(Router);
    const userInfoService = inject(UserInfoService);

    const user = await lastValueFrom(userInfoService.userInfo$());
    if (!user) {
        void router.navigateByUrl('/login');
        return false;
    }
    return true;
};
