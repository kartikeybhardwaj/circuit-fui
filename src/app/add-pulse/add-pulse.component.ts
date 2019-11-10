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
  AddPulseStorageService
} from './add-pulse.service';
import {
  MetaPulsesStorageService
} from '../meta-pulses/meta-pulses.service';
import {
  ProjectStorageService
} from '../projects/projects.service';
import {
  MilestoneStorageService
} from '../milestones/milestones.service';

@Component({
  selector: 'app-add-pulse',
  templateUrl: './add-pulse.component.html',
  styleUrls: ['./add-pulse.component.css']
})
export class AddPulseComponent implements OnInit {

  pulse: AddPulseData = {
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    color: 'blue',
    assignees: [],
    pulseMetaId: null,
    fields: [],
    linkedProjectId: null,
    linkedMilestoneId: null
  };
  selectedPulseMeta: any = null;
  timeline = null;
  isAdding = false;
  projectMembersMap: any = {};

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
    public metaPulseInfo: MetaPulsesStorageService,
    private addPulseInfo: AddPulseStorageService,
    private projectInfo: ProjectStorageService,
    private milestoneInfo: MilestoneStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params &&
      activatedRouteSnapshot.params.projectId &&
      activatedRouteSnapshot.params.milestoneId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
      appInfo.selectedMilestoneId = activatedRouteSnapshot.params.milestoneId;
    }
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Add Pulse';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.fillAssignees();
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

  createReqObject(): AddPulseData {
    if (this.timeline && this.timeline.begin && this.timeline.end) {
      this.pulse.timeline.begin = this.timeline.begin.toString();
      this.pulse.timeline.begin = this.pulse.timeline.begin.substr(0, 16) + this.startTime + this.pulse.timeline.begin.substring(21);
      this.pulse.timeline.begin = new Date(this.pulse.timeline.begin).toISOString();
      this.pulse.timeline.end = this.timeline.end.toString();
      this.pulse.timeline.end = this.pulse.timeline.end.substr(0, 16) + this.endTime + this.pulse.timeline.begin.substring(21);
      this.pulse.timeline.end = new Date(this.pulse.timeline.end).toISOString();
      this.pulse.linkedProjectId = this.appInfo.selectedProjectId;
      this.pulse.linkedMilestoneId = this.appInfo.selectedMilestoneId;
      this.pulse.assignees = [];
      this.selectedAssignees.forEach(assignee => {
        this.pulse.assignees.push(this.projectMembersMap[assignee]);
      });
    }
    return this.pulse;
  }

  addPulse(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.addPulseInfo.validateRequest(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isAdding = true;
      this.addPulseInfo.addPulse(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isAdding = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            this.router.navigate([
              '/projects/' + this.appInfo.selectedProjectId +
              '/milestones/' + this.appInfo.selectedMilestoneId +
              '/pulses'
            ]);
          }
        })
        .catch((error: [boolean, string, any]) => {
          this.isAdding = false;
          this.openSnackBar(error[1], null);
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center', // left, right, start, end, center
      verticalPosition: 'bottom', // top, bottom
      duration: 3500
    });
  }

}
