import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolbarModule } from './components/toolbar';
import { MenuModule } from './components/menu';
const moduleImports = [BrowserModule, BrowserAnimationsModule, AppRoutingModule, LayoutModule, ToolbarModule, MenuModule, HttpClientModule];

import { MatSidenavModule } from '@angular/material/sidenav';
const materialImports = [MatSidenavModule];

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
const ngrxImports = [
  StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictActionImmutability: true,
      strictStateImmutability: true,
      strictActionSerializability: true,
      strictStateSerializability: true
    }
  }),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, autoPause: true }),
  EffectsModule.forRoot([]),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router', routerState: RouterState.Minimal })
];

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [AuthModule.forRoot(), ...materialImports, ...moduleImports, ...ngrxImports],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
