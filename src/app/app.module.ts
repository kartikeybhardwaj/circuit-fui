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
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import {
  MatListModule
} from '@angular/material/list';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import {
  ProjectsComponent
} from './projects/projects.component';
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
  NavigationPanelComponent,
  BottomSheetMenu
} from './navigation-panel/navigation-panel.component';
import {
  HeaderComponent
} from './header/header.component';
import { MilestonesComponent } from './milestones/milestones.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    PageNotFoundComponent,
    UnauthorizedAccessComponent,
    NavigationPanelComponent,
    BottomSheetMenu,
    HeaderComponent,
    MilestonesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AppStorageService
  ],
  entryComponents: [
    BottomSheetMenu
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
