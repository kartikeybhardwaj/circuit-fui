import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  HttpClientModule
} from '@angular/common/http';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  FormsModule
} from '@angular/forms';
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
  MatRippleModule,
  MatNativeDateModule
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
  TextFieldModule
} from '@angular/cdk/text-field';
import {
  MatRadioModule
} from '@angular/material/radio';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {
  MatInputModule
} from '@angular/material/input';
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
import {
  MilestonesComponent
} from './milestones/milestones.component';
import {
  PulsesComponent
} from './pulses/pulses.component';
import {
  AddProjectComponent
} from './add-project/add-project.component';
import {
  AddMilestoneComponent
} from './add-milestone/add-milestone.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    PageNotFoundComponent,
    UnauthorizedAccessComponent,
    NavigationPanelComponent,
    BottomSheetMenu,
    HeaderComponent,
    MilestonesComponent,
    PulsesComponent,
    AddProjectComponent,
    AddMilestoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
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
