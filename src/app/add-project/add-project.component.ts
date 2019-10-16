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

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: any = {};

  projectMetas: any = [];
  selectedMeta: any = {};

  memberNameToAdd = '';
  allRoles: any = [];
  selectedRole: any = {};

  message = '';
  errorMessage = '';
  isAdding = false;

  constructor(
    public appInfo: AppStorageService,
    private router: Router
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
      projectMetaId: '',
      fields: {},
      members: [],
      meta: {
        addedBy: '1234567890',
        addedOn: new Date(),
        lastUpdatedBy: '1234567890',
        lastUpdatedOn: new Date()
      }
    };
    this.getProjectMetas().then(
      (response) => {
        this.projectMetas = response;
      },
      (error) => {}
    );
    this.getRoles().then(
      (response) => {
        this.allRoles = response;
      },
      (error) => {}
    );
  }

  changedProjectMetaId(event: any): void {
    this.project.fields = {};
  }

  getProjectMetas(): any {
    return new Promise((resolve, reject) => {
      const projectMetas = [{
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
      resolve(projectMetas);
    });
  }

  getRoles(): any {
    return new Promise((resolve, reject) => {
      const roles = [{
        _id: '1234567890',
        title: 'Super User',
        description: 'Super User who can do anything.',
        isSuperUser: true,
        canModifyUsersRole: true,
        canModifyLocations: true,
        canModifyProjects: true,
        canModifyMilestones: true,
        canModifyPulses: true
      }, {
        _id: '1234567890',
        title: 'Project Manager',
        description: 'Just some designation',
        isSuperUser: false,
        canModifyUsersRole: true,
        canModifyLocations: true,
        canModifyProjects: true,
        canModifyMilestones: true,
        canModifyPulses: true
      }, {
        _id: '1234567890',
        title: 'Project Member',
        description: 'Just some designation',
        isSuperUser: false,
        canModifyUsersRole: false,
        canModifyLocations: true,
        canModifyProjects: false,
        canModifyMilestones: false,
        canModifyPulses: true
      }, {
        _id: '1234567890',
        title: 'That one guy',
        description: 'Just some designation',
        isSuperUser: false,
        canModifyUsersRole: false,
        canModifyLocations: true,
        canModifyProjects: false,
        canModifyMilestones: false,
        canModifyPulses: false
      }];
      resolve(roles);
    });
  }

  addMember(): void {
    this.project.members.push({
      username: '',
      roleId: ''
    });
  }

  deleteMember(indexMember): void {
    this.project.members.splice(indexMember, 1);
  }

  addProject(): void {
    this.message = '';
    this.errorMessage = '';
    this.isAdding = true;
  }

}
