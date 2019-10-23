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

@Component({
  selector: 'app-edit-pulse',
  templateUrl: './edit-pulse.component.html',
  styleUrls: ['./edit-pulse.component.css']
})
export class EditPulseComponent implements OnInit {
  pulse: any = {};

  pulseMetas: any = [];
  selectedMeta: any = {};

  isUpdating = false;

  selectableAssignee = true;
  removableAssignee = true;
  addOnBlurAssignee = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeCtrl = new FormControl();
  filteredAssignees: Observable < string[] > ;
  allAssignees: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

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
    private router: Router
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
    this.filteredAssignees = this.assigneeCtrl.valueChanges.pipe(
      startWith(null),
      map((thisAssignee: string | null) => thisAssignee ? this._filter(thisAssignee) : this.allAssignees.slice()));
  }

  ngOnInit() {
    this.pulse = {
      title: '',
      description: '',
      timeline: {},
      pulseMetaId: '',
      fields: {},
      assignees: [],
      meta: {
        addedBy: '1234567890',
        addedOn: new Date(),
        lastUpdatedBy: '1234567890',
        lastUpdatedOn: new Date()
      }
    };
    this.getPulseMetas().then(
      (response) => {},
      (error) => {}
    );
  }

  changedPulseMetaId(event: any): void {
    this.pulse.fields = {};
  }

  addAssignee(event: MatChipInputEvent): void {
    // Add assignee only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.autoAssignee.isOpen) {
      const input = event.input;
      const value = event.value.trim();
      // Add our assignee
      if (this.allAssignees.indexOf(value) !== -1 && this.pulse.assignees.indexOf(value) === -1) {
        this.pulse.assignees.push(value);
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.assigneeCtrl.setValue(null);
    }
  }

  removeAssignee(assignee: string): void {
    const index = this.pulse.assignees.indexOf(assignee);
    if (index >= 0) {
      this.pulse.assignees.splice(index, 1);
    }
  }

  selectedAssignee(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (this.allAssignees.indexOf(value) !== -1 && this.pulse.assignees.indexOf(value) === -1) {
      this.pulse.assignees.push(value);
      this.assigneeInput.nativeElement.value = '';
      this.assigneeCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAssignees.filter(assignee => assignee.toLowerCase().indexOf(filterValue) === 0);
  }

  getPulseMetas(): any {
    return new Promise((resolve, reject) => {
      const pulseMetas = [{
        _id: '1234567890',
        title: 'None',
        description: 'nothing in here',
        fields: []
      }, {
        _id: '1234567890',
        title: 'meta 1',
        description: 'nothing in here',
        fields: [{
          key: 'select 1',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'Angular', 'Node.js']
        }, {
          key: 'select 2',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'React.js', 'Node.js']
        }, {
          key: 'enter here',
          valueType: 'input',
          value: 'default value'
        }]
      }, {
        _id: '0987654321',
        title: 'meta 2',
        description: 'nothing in here',
        fields: [{
          key: 'select 1',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'Angular', 'Node.js']
        }, {
          key: 'select 2',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'React.js', 'Node.js']
        }, {
          key: 'enter here',
          valueType: 'input',
          value: 'default value'
        }]
      }];
      this.pulseMetas = pulseMetas;
      this.selectedMeta = this.pulseMetas[0];
      resolve(true);
    });
  }

  updatePulse(): void {
    this.isUpdating = true;
    setTimeout(() => {
      this.isUpdating = false;
    }, 3000);
  }

}
