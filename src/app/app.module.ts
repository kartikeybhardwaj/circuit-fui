import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  MatIconModule
} from '@angular/material/icon';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatRippleModule
} from '@angular/material/core';
import {
  HomeComponent
} from './home/home.component';
import {
  PageNotFoundComponent
} from './page-not-found/page-not-found.component';
import {
  UnauthorizedAccessComponent
} from './unauthorized-access/unauthorized-access.component';
import {
  AppStorageService
} from './app.service';
import {
  NavigationPanelComponent
} from './navigation-panel/navigation-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    UnauthorizedAccessComponent,
    NavigationPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  providers: [
    AppStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
