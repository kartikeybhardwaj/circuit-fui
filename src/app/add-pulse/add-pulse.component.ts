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
  Router
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
  selector: 'app-add-pulse',
  templateUrl: './add-pulse.component.html',
  styleUrls: ['./add-pulse.component.css']
})
export class AddPulseComponent implements OnInit {

  pulse: any = {};

  pulseMetas: any = [];
  selectedMeta: any = {};

  message = '';
  errorMessage = '';
  isAdding = false;

  startDate = '';
  endDate = '';
  startHour = 'Hour';
  endHour = 'Hour';
  startMin = 'Min';
  endMin = 'Min';

  hours = ['Hour', '00', '01', '02', '03',
    '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17',
    '18', '19', '20', '21', '22', '23'
  ];

  mins = ['Min', '00', '05', '10',
    '15', '20', '25', '30', '35',
    '40', '45', '50', '55'
  ];

  selectableAssignee = true;
  removableAssignee = true;
  addOnBlurAssignee = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeCtrl = new FormControl();
  filteredAssignees: Observable < string[] > ;
  assignees: string[] = [];
  allAssignees: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('assigneeInput', {
    static: false
  }) assigneeInput: ElementRef < HTMLInputElement > ;
  @ViewChild('autoAssignee', {
    static: false
  }) autoAssignee: MatAutocomplete;

  constructor(
    public appInfo: AppStorageService,
    private router: Router
  ) {
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
      pulseMetaId: '',
      fields: {},
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
      const indexOfValue = this.allAssignees.indexOf(value);
      if (indexOfValue !== -1) {
        this.assignees.push(value);
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.assigneeCtrl.setValue(null);
    }
  }

  removeAssignee(assignee: string): void {
    const index = this.assignees.indexOf(assignee);
    if (index >= 0) {
      this.assignees.splice(index, 1);
    }
  }

  selectedAssignee(event: MatAutocompleteSelectedEvent): void {
    this.assignees.push(event.option.viewValue);
    this.assigneeInput.nativeElement.value = '';
    this.assigneeCtrl.setValue(null);
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

  addPulse(): void {
    this.message = '';
    this.errorMessage = '';
    this.isAdding = true;
  }

}
