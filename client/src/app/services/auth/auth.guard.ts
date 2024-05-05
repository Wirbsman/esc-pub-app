import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router, private readonly userInfoService: UserInfoService) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const user = await lastValueFrom(this.userInfoService.userInfo$());
        if (!user) {
            void this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
