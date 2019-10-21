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

  isAdding = false;

  selectableAssignee = true;
  removableAssignee = true;
  addOnBlurAssignee = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeCtrl = new FormControl();
  filteredAssignees: Observable < string[] > ;
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

  addPulse(): void {
    this.isAdding = true;
    setTimeout(() => {
      this.isAdding = false;
    }, 3000);
  }

}
