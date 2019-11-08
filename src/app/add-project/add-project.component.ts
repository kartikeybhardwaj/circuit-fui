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
  MetaProjectsStorageService
} from '../meta-projects/meta-projects.service';
import {
  RoleStorageService
} from '../roles/roles.service';
import {
  AddProjectStorageService
} from './add-project.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: AddProjectData = {
    title: '',
    description: '',
    visibility: 'internal',
    members: [],
    projectMetaId: null,
    fields: [],
  };

  selectedProjectMetaId: any = null;
  isAdding = false;

  constructor(
    public appInfo: AppStorageService,
    public roleInfo: RoleStorageService,
    public metaProjectsInfo: MetaProjectsStorageService,
    private addProjectInfo: AddProjectStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Add Project';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.project = {
      title: '',
      description: '',
      visibility: 'internal',
      members: [],
      projectMetaId: null,
      fields: [],
    };
  }

  changedProjectMetaId(event: any): void {
    this.project.fields = [];
    event.value.fields.forEach(field => {
      this.project.fields.push({
        key: field.key,
        value: null
      });
    });
    this.project.projectMetaId = event.value.metaProjectId;
  }

  addMember(): void {
    this.project.members.push({
      username: '',
      displayname: '',
      roleId: ''
    });
  }

  deleteMember(indexMember): void {
    this.project.members.splice(indexMember, 1);
  }

  createReqObject(): AddProjectData {
    this.project.members.forEach(member => {
      member.displayname = member.username;
    });
    return this.project;
  }

  addProject(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.addProjectInfo.validateRequest(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isAdding = true;
      this.addProjectInfo.addProject(reqPayload)
      .then((resp: [boolean, string, any]) => {
        this.isAdding = false;
        this.openSnackBar(resp[1], null);
        if (resp[0]) {
          this.router.navigate(['/projects/' + resp[2]._id + '/milestones']);
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
