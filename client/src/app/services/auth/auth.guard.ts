import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router, private readonly appService: AppService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const user = lastValueFrom(this.appService.currentUser$);
        if (!!user) {
            return true;
        } else {
            void this.router.navigateByUrl('/login');
            return false;
        }
    }
}
