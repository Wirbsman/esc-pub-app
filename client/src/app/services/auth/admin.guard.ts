import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard  {
    constructor(private readonly router: Router, private readonly userInfoService: UserInfoService) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const user = await lastValueFrom(this.userInfoService.userInfo$());
        if (!user) {
            void this.router.navigateByUrl('/login');
            return false;
        }
        if (!user.admin) {
            void this.router.navigateByUrl('/vote');
            return false;
        }
        return true;
    }
}
