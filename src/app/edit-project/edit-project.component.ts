import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  EditProjectStorageService
} from './edit-project.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  MetaProjectsStorageService
} from '../meta-projects/meta-projects.service';
import {
  RoleStorageService
} from '../roles/roles.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: EditProjectData = {
    projectId: '',
    title: '',
    description: '',
    visibility: 'internal',
    members: [],
    membersTodo: {
      toAdd: [],
      toRemove: []
    },
    projectMetaId: null,
    fields: [],
  };
  selectedProjectMeta: any = null;
  initialMembers: string[] = [];

  isUpdating = false;

  constructor(
    public appInfo: AppStorageService,
    private editProjectInfo: EditProjectStorageService,
    public metaProjectsInfo: MetaProjectsStorageService,
    public roleInfo: RoleStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params &&
      activatedRouteSnapshot.params.projectId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
    }
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Edit ' + this.appInfo.constants.buildingBlocks.labels.project;
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    if (this.editProjectInfo.project.title === '') {
      this.editProjectInfo.getProject(this.appInfo.selectedProjectId)
        .then((response: any) => {
          this.project = this.editProjectInfo.project;
          this.selectedProjectMeta = this.editProjectInfo.selectedProjectMeta;
          this.initialMembers = this.editProjectInfo.initialMembers;
        })
        .catch((error: any) => {
          this.openSnackBar(error, null);
        });
    } else {
      this.project = this.editProjectInfo.project;
      this.selectedProjectMeta = this.editProjectInfo.selectedProjectMeta;
      this.initialMembers = this.editProjectInfo.initialMembers;
    }
  }

  changedProjectMeta(event: any): void {
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

  createReqObject(): EditProjectData {
    const finalMembers: string[] = [];
    this.project.members.forEach(member => {
      finalMembers.push(member.username);
      member.displayname = member.username;
    });
    this.project.membersTodo.toRemove = this.initialMembers.filter(x => !finalMembers.includes(x));
    this.project.membersTodo.toAdd = finalMembers.filter(x => !this.initialMembers.includes(x));
    return this.project;
  }

  updateProject(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.editProjectInfo.validateRequestUpdateProject(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isUpdating = true;
      this.editProjectInfo.updateProject(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isUpdating = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            this.router.navigate(['/projects/']);
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
