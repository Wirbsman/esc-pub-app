import { Component } from '@angular/core';
import { CurrentUser } from './current-user';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(private currentUser: CurrentUser) {
        this.currentUser.load();
    }
}


