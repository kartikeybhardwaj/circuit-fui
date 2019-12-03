import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  COMMA,
  ENTER
} from '@angular/cdk/keycodes';
import {
  FormControl
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from '@angular/material/autocomplete';
import {
  map,
  startWith
} from 'rxjs/operators';
import {
  MatChipInputEvent
} from '@angular/material/chips';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  EditPulseStorageService
} from './edit-pulse.service';
import {
  MetaPulsesStorageService
} from '../meta-pulses/meta-pulses.service';
import {
  ProjectStorageService
} from '../projects/projects.service';
import {
  LocationStorageService
} from '../locations/locations.service';

@Component({
  selector: 'app-edit-pulse',
  templateUrl: './edit-pulse.component.html',
  styleUrls: ['./edit-pulse.component.css']
})
export class EditPulseComponent implements OnInit {

  pulse: EditPulseData = {
    pulseId: '',
    milestoneId: '',
    projectId: '',
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    color: 'blue',
    assignees: [],
    assigneesTodo: {
      toAdd: [],
      toRemove: []
    },
    pulseMetaId: null,
    fields: []
  };
  selectedPulseMeta: any = null;
  timeline = null;
  initialAssignees: string[] = [];
  isUpdating = false;
  isValidatingUsers = false;
  projectMembersMap: any = {};

  displayUserAvailability: string[] = [];

  selectableAssignee = true;
  removableAssignee = true;
  addOnBlurAssignee = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeCtrl = new FormControl();
  filteredAssignees: Observable < string[] > ;
  allAssignees: string[] = [];
  selectedAssignees: string[] = [];

  colors = [
    'blue', 'black',
    'green', 'red'
  ];
  timeHours: string[] = [
    '00:00', '00:30', '01:00', '01:30',
    '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30',
    '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30'
  ];
  startTime = '09:30';
  endTime = '17:30';

  @ViewChild('assigneeInput', {
    static: false
  }) assigneeInput: ElementRef < HTMLInputElement > ;
  @ViewChild('autoAssignee', {
    static: false
  }) autoAssignee: MatAutocomplete;

  constructor(
    public appInfo: AppStorageService,
    private activatedRoute: ActivatedRoute,
    private projectInfo: ProjectStorageService,
    private editPulseInfo: EditPulseStorageService,
    public metaPulseInfo: MetaPulsesStorageService,
    private locationInfo: LocationStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params &&
      activatedRouteSnapshot.params.projectId &&
      activatedRouteSnapshot.params.milestoneId &&
      activatedRouteSnapshot.params.pulseId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
      appInfo.selectedMilestoneId = activatedRouteSnapshot.params.milestoneId;
      appInfo.selectedPulseId = activatedRouteSnapshot.params.pulseId;
    }
    appInfo.otherHeader = 'Edit Pulse';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
    this.filteredAssignees = this.assigneeCtrl.valueChanges.pipe(
      startWith(null),
      map((thisAssignee: string | null) => thisAssignee ? this._filter(thisAssignee) : this.allAssignees.slice()));
  }

  ngOnInit() {
    this.fillAssignees();
    if (this.editPulseInfo.pulse.title === '') {
      this.editPulseInfo.getPulse(this.appInfo.selectedProjectId, this.appInfo.selectedMilestoneId, this.appInfo.selectedPulseId)
        .then((response: any) => {
          this.pulse = this.editPulseInfo.pulse;
          this.selectedPulseMeta = this.editPulseInfo.selectedPulseMeta;
          this.timeline = this.editPulseInfo.timeline;
          this.initialAssignees = this.editPulseInfo.initialAssignees;
          this.pulse.assignees.forEach((assignee) => {
            this.selectedAssignees.push(this.projectInfo.idMapProjects[assignee]);
          });
        })
        .catch((error: any) => {
          this.openSnackBar(error, null);
        });
    } else {
      this.pulse = this.editPulseInfo.pulse;
      this.selectedPulseMeta = this.editPulseInfo.selectedPulseMeta;
      this.timeline = this.editPulseInfo.timeline;
      this.initialAssignees = this.editPulseInfo.initialAssignees;
      this.pulse.assignees.forEach((assignee) => {
        this.selectedAssignees.push(this.projectInfo.idMapProjects[assignee]);
      });
    }
  }

  fillAssignees(): void {
    this.allAssignees = [];
    this.projectInfo.projects.some(project => {
      if (project.projectId === this.appInfo.selectedProjectId) {
        project.members.forEach(member => {
          this.projectMembersMap[this.projectInfo.idMapProjects[member.userId]] = member.userId;
          this.allAssignees.push(this.projectInfo.idMapProjects[member.userId]);
        });
        return true;
      }
    });
    this.filteredAssignees = this.assigneeCtrl.valueChanges.pipe(
      startWith(null),
      map((thisAssignee: string | null) => thisAssignee ? this._filter(thisAssignee) : this.allAssignees.slice()));
  }

  changedPulseMeta(event: any): void {
    this.pulse.fields = [];
    event.value.fields.forEach(field => {
      this.pulse.fields.push({
        key: field.key,
        value: null
      });
    });
    this.pulse.pulseMetaId = event.value.metaPulseId;
  }

  addAssignee(event: MatChipInputEvent): void {
    // Add assignee only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.autoAssignee.isOpen) {
      const input = event.input;
      const value = event.value.trim();
      // Add our assignee
      if (this.allAssignees.indexOf(value) !== -1 && this.selectedAssignees.indexOf(value) === -1) {
        this.selectedAssignees.push(value);
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.assigneeCtrl.setValue(null);
    }
  }

  removeAssignee(assignee: string): void {
    const index = this.selectedAssignees.indexOf(assignee);
    if (index >= 0) {
      this.selectedAssignees.splice(index, 1);
    }
  }

  selectedAssignee(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (this.allAssignees.indexOf(value) !== -1 && this.selectedAssignees.indexOf(value) === -1) {
      this.selectedAssignees.push(value);
      this.assigneeInput.nativeElement.value = '';
      this.assigneeCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAssignees.filter(assignee => assignee.toLowerCase().indexOf(filterValue) === 0);
  }

  createValidateUsersAvailabilityReqObject(): CheckUsersAvailabilityData {
    const payload: CheckUsersAvailabilityData = {
      milestoneId: null,
      timeline: {
        begin: null,
        end: null
      },
      members: []
    };
    try {
      payload.milestoneId = this.appInfo.selectedMilestoneId;
      let begin = this.timeline.begin.toString();
      begin = begin.substr(0, 16) + this.startTime + begin.substring(21);
      begin = new Date(begin).toISOString();
      let end = this.timeline.end.toString();
      end = end.substr(0, 16) + this.endTime + end.substring(21);
      end = new Date(end).toISOString();
      payload.timeline = {
        begin,
        end
      };
      const assignees = [];
      this.selectedAssignees.forEach(assignee => {
        assignees.push(this.projectMembersMap[assignee]);
      });
      payload.members = assignees;
    } catch (error) {}
    return payload;
  }

  validateUsersAvailability(): void {
    const reqPayload = this.createValidateUsersAvailabilityReqObject();
    const afterValidateReqPayload = this.editPulseInfo.validateRequestCheckAvailability(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isValidatingUsers = true;
      this.editPulseInfo.getUsersAvailability(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isValidatingUsers = false;
          if (!resp[0]) {
            this.openSnackBar(resp[1], null);
          } else {
            this.displayUserAvailability = [];
            Object.keys(resp[2]).forEach(memberId => {
              if (resp[2][memberId].status === false) {
                let thisMemberUsername = '';
                Object.keys(this.projectMembersMap).some(element => {
                  if (this.projectMembersMap[element] === memberId) {
                    thisMemberUsername = element;
                    return true;
                  }
                });
                if (resp[2][memberId].nonAvailability) {
                  this.displayUserAvailability.push(
                    thisMemberUsername +
                    ' has blocked calendar from ' +
                    this.appInfo.getLongDate(resp[2][memberId].nonAvailability.timeline.begin) +
                    ' to ' +
                    this.appInfo.getLongDate(resp[2][memberId].nonAvailability.timeline.end)
                  );
                } else if (resp[2][memberId].otherLocations) {
                  this.displayUserAvailability.push(
                    thisMemberUsername +
                    ' is located at ' +
                    this.locationInfo.idMapLocations[resp[2][memberId].otherLocations.locationId].join(', ') +
                    ' from ' +
                    this.appInfo.getLongDate(resp[2][memberId].otherLocations.timeline.begin) +
                    ' to ' +
                    this.appInfo.getLongDate(resp[2][memberId].otherLocations.timeline.end)
                  );
                } else if (resp[2][memberId].baseLocationMatch) {
                  this.displayUserAvailability.push(
                    thisMemberUsername +
                    ' is located at ' +
                    this.locationInfo.idMapLocations[resp[2][memberId].baseLocationMatch].join(', ')
                  );
                }
              }
            });
          }
        })
        .catch((error: [boolean, string, any]) => {
          this.isValidatingUsers = false;
          this.openSnackBar(error[1], null);
        });
    }
  }

  createReqObject(): EditPulseData {
    try {
      this.pulse.timeline.begin = this.timeline.begin.toString();
      this.pulse.timeline.begin = this.pulse.timeline.begin.substr(0, 16) + this.startTime + this.pulse.timeline.begin.substring(21);
      this.pulse.timeline.begin = new Date(this.pulse.timeline.begin).toISOString();
      this.pulse.timeline.end = this.timeline.end.toString();
      this.pulse.timeline.end = this.pulse.timeline.end.substr(0, 16) + this.endTime + this.pulse.timeline.end.substring(21);
      this.pulse.timeline.end = new Date(this.pulse.timeline.end).toISOString();
      this.pulse.assignees = [];
      this.pulse.assigneesTodo.toAdd = [];
      this.pulse.assigneesTodo.toRemove = [];
      this.selectedAssignees.forEach(assignee => {
        this.pulse.assignees.push(this.projectMembersMap[assignee]);
      });
      this.pulse.assigneesTodo.toRemove = this.initialAssignees.filter(x => !this.pulse.assignees.includes(x));
      this.pulse.assigneesTodo.toAdd = this.pulse.assignees.filter(x => !this.initialAssignees.includes(x));
    } catch (error) {}
    return this.pulse;
  }

  updatePulse(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.editPulseInfo.validateRequestUpdatePulse(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isUpdating = true;
      this.editPulseInfo.updatePulse(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isUpdating = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            this.router.navigate([
              '/projects/' +
              this.appInfo.selectedProjectId +
              '/milestones/' +
              this.appInfo.selectedMilestoneId +
              '/pulses'
            ]);
          }
        })
        .catch((error: [boolean, string, any]) => {
          this.isUpdating = false;
          this.openSnackBar(error[1], null);
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
