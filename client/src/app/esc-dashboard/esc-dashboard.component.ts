import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Router} from "@angular/router";

@Component({
  selector: 'app-esc-dashboard',
  templateUrl: './esc-dashboard.component.html',
  styleUrls: ['./esc-dashboard.component.css']
})
export class EscDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Card 1', cols: 1, rows: 1},
          {title: 'Card 2', cols: 1, rows: 1},
          {title: 'Card 3', cols: 1, rows: 1},
        ];
      }

      return [
        {title: 'Card 1', cols: 1, rows: 1},
        {title: 'Card 2', cols: 1, rows: 1},
        {title: 'Card 3', cols: 2, rows: 1},
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {
  }

  toVote() {

    this.router.navigateByUrl("/vote");
  }

}
