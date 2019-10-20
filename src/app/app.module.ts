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
  FormsModule,
  ReactiveFormsModule
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
  MatChipsModule
} from '@angular/material/chips';
import {
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import {
  MatTableModule
} from '@angular/material/table';
import {
  MatPaginatorModule
} from '@angular/material/paginator';
import {
  MatSortModule
} from '@angular/material/sort';
import {
  MatCardModule
} from '@angular/material/card';

import {
  SatDatepickerModule,
  SatNativeDateModule
} from 'saturn-datepicker';

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
import {
  AddPulseComponent
} from './add-pulse/add-pulse.component';

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
    AddMilestoneComponent,
    AddPulseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    SatDatepickerModule,
    SatNativeDateModule
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
