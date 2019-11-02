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
  MatMenuModule
} from '@angular/material/menu';

import {
  SatDatepickerModule,
  SatNativeDateModule
} from 'saturn-datepicker';

import {
  FullCalendarModule
} from '@fullcalendar/angular';

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
  HeaderStorageService
} from './header/header.service';
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
import {
  ProjectStorageService
} from './projects/projects.service';
import {
  MilestoneStorageService
} from './milestones/milestones.service';
import {
  PulseStorageService
} from './pulses/pulses.service';
import {
  EditProjectComponent
} from './edit-project/edit-project.component';
import {
  EditMilestoneComponent
} from './edit-milestone/edit-milestone.component';
import {
  EditPulseComponent
} from './edit-pulse/edit-pulse.component';
import {
  TravelsComponent
} from './travels/travels.component';
import {
  TravelsStorageService
} from './travels/travels.service';
import {
  BlockCalendarComponent
} from './block-calendar/block-calendar.component';
import {
  BlockagesStorageService
} from './block-calendar/block-calendar.service';
import {
  HomeComponent
} from './home/home.component';
import {
  UserCalendarComponent
} from './user-calendar/user-calendar.component';
import {
  RolesComponent
} from './roles/roles.component';
import {
  RoleStorageService
} from './roles/roles.service';

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
    AddPulseComponent,
    EditProjectComponent,
    EditMilestoneComponent,
    EditPulseComponent,
    TravelsComponent,
    BlockCalendarComponent,
    HomeComponent,
    UserCalendarComponent,
    RolesComponent
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
    MatMenuModule,
    SatDatepickerModule,
    SatNativeDateModule,
    FullCalendarModule
  ],
  providers: [
    AppStorageService,
    HeaderStorageService,
    ProjectStorageService,
    MilestoneStorageService,
    PulseStorageService,
    TravelsStorageService,
    BlockagesStorageService,
    RoleStorageService
  ],
  entryComponents: [
    BottomSheetMenu
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
