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
  AddMetaProjectStorageService
} from './add-meta-project.service';

@Component({
  selector: 'app-add-meta-project',
  templateUrl: './add-meta-project.component.html',
  styleUrls: ['./add-meta-project.component.css']
})
export class AddMetaProjectComponent implements OnInit {

  metaProject: AddMetaProjectData = {
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
    private addMetaProjectInfo: AddMetaProjectStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Add meta project';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.addField();
  }

  changedFieldValueType(event: any, field: AddMetaProjectFieldsData): void {
    field.valueType = event.value;
    if (field.valueType === 'input') {
      field.value = '';
    } else if (field.valueType === 'select') {
      field.value = [];
    }
  }

  addValue(event: MatChipInputEvent, field: AddMetaProjectFieldsData): void {
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

  removeValue(field: AddMetaProjectFieldsData, value: string): void {
    const index = field.value.indexOf(value);
    if (index >= 0) {
      field.value.splice(index, 1);
    }
  }

  addField(): void {
    this.metaProject.fields.push({
      key: '',
      valueType: 'input',
      value: ''
    });
  }

  deleteField(indexField): void {
    this.metaProject.fields.splice(indexField, 1);
  }

  createReqObject(): AddMetaProjectData {
    return this.metaProject;
  }

  addMetaProject(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.addMetaProjectInfo.validateRequest(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isAdding = true;
      this.addMetaProjectInfo.addMetaProject(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isAdding = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            // this.router.navigate(['/projects/' + resp[2]._id + '/milestones']);
            // TODO: navigate to allMetaProjects page
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
