import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Subject } from 'rxjs';

@Component({
  selector: 'base-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly logoutUris = ['/', '/login'];
  small$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map(({ matches }) => matches));
  url$ = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationEnd),
    map(event => this.logoutUris.includes(event.url))
  );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.router.url;
  }
}
