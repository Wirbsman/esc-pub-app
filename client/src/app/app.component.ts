import { Component } from '@angular/core';
import { CurrentUser } from './current-user';
import { AppService } from './services/app.service';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(private currentUser: CurrentUser,
                private readonly appService: AppService) {
        this.currentUser.load();
        this.appService.init();
    }
}


