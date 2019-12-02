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

  project: AddProjectData = {
    title: '',
    description: '',
    visibility: 'internal',
    members: [],
    projectMetaId: null,
    fields: [],
  };
  selectedProjectMeta: any = null;

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
    appInfo.otherHeader = 'Edit Project';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    if (this.editProjectInfo.project.title === '') {
      this.editProjectInfo.getProject(this.appInfo.selectedProjectId)
        .then((response: any) => {
          this.project = this.editProjectInfo.project;
          this.selectedProjectMeta = this.editProjectInfo.selectedProjectMeta;
        })
        .catch((error: any) => {
          this.openSnackBar(error, null);
        });
    } else {
      this.project = this.editProjectInfo.project;
      this.selectedProjectMeta = this.editProjectInfo.selectedProjectMeta;
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

  updateProject(): void {
    this.isUpdating = true;
    setTimeout(() => {
      this.isUpdating = false;
    }, 2500);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
