import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { login } from './auth/auth.actions';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { AppState } from './reducers';

@Component({
  selector: 'base-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  small$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map(({ matches }) => matches));
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  isLoggedOut$ = this.store.pipe(select(isLoggedOut));

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }
  }
}
