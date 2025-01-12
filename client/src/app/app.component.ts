import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppService } from './services/app.service';

@Component({
    selector: 'app-root',
    template: ` <router-outlet></router-outlet> `,
    imports: [RouterOutlet],
})
export class AppComponent {
    constructor(private readonly appService: AppService) {
        this.appService.init();
    }
}
