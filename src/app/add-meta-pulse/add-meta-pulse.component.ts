import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  Router
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  COMMA,
  ENTER
} from '@angular/cdk/keycodes';
import {
  MatChipInputEvent
} from '@angular/material/chips';
import {
  AddMetaPulseStorageService
} from './add-meta-pulse.service';

@Component({
  selector: 'app-add-meta-pulse',
  templateUrl: './add-meta-pulse.component.html',
  styleUrls: ['./add-meta-pulse.component.css']
})
export class AddMetaPulseComponent implements OnInit {

  metaPulse: AddMetaPulseData = {
    title: '',
    description: '',
    fields: []
  };
  isAdding = false;

  valueTypes = [
    'input',
    'select'
  ];

  // valueTypes' values
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public appInfo: AppStorageService,
    private addMetaPulseInfo: AddMetaPulseStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Add meta ' + this.appInfo.constants.buildingBlocks.labels.lowercase.pulse;
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.addField();
  }

  changedFieldValueType(event: any, field: AddMetaPulseFieldsData): void {
    field.valueType = event.value;
    if (field.valueType === 'input') {
      field.value = '';
    } else if (field.valueType === 'select') {
      field.value = [];
    }
  }

  addValue(event: MatChipInputEvent, field: AddMetaPulseFieldsData): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      field.value.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeValue(field: AddMetaPulseFieldsData, value: string): void {
    const index = field.value.indexOf(value);
    if (index >= 0) {
      field.value.splice(index, 1);
    }
  }

  addField(): void {
    this.metaPulse.fields.push({
      key: '',
      valueType: 'input',
      value: ''
    });
  }

  deleteField(indexField): void {
    this.metaPulse.fields.splice(indexField, 1);
  }

  createReqObject(): AddMetaPulseData {
    return this.metaPulse;
  }

  addMetaPulse(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.addMetaPulseInfo.validateRequest(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isAdding = true;
      this.addMetaPulseInfo.addMetaPulse(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isAdding = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            this.router.navigate(['/meta-pulses']);
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
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
