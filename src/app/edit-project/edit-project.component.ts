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
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  project: any = {};

  projectMetas: any = [];
  selectedMeta: any = {};

  allRoles: any = [];
  selectedRole: any = {};

  isUpdating = false;

  constructor(
    public appInfo: AppStorageService,
    private router: Router
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Edit Project';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.project = {
      index: 4,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'internal',
      visibilityIcon: this.appInfo.constants.buildingBlocks.icons.internal,
      members: [{
        _id: '0',
        username: 'some user',
        roleId: '1',
        roleName: 'Project Manager',
      }, {
        _id: '1',
        username: 'some user',
        roleId: '3',
        roleName: 'That one guy',
      }],
      milestonesList: [{
        _id: '1234567890',
        title: 'milestone title 1'
      }, {
        _id: '1234567890',
        title: 'milestone title 2'
      }],
      milestonesListCount: 4,
      projectMetaId: '2',
      fields: [{
        key: 'select 1',
        'select 1': 'Angular'
      }, {
        key: 'select 2',
        'select 2': 'React.js'
      }, {
        key: 'enter here',
        'enter here': 'some value here'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    };
    this.getProjectMetas().then(
      (projectMetas) => {
        this.projectMetas = projectMetas;
        this.projectMetas.some(meta => {
          if (meta._id === this.project.projectMetaId) {
            this.selectedMeta = meta;
            return true;
          }
        });
      },
      (error) => {}
    );
    this.getRoles().then(
      (response) => {},
      (error) => {}
    );
  }

  changedProjectMetaId(event: any): void {
    this.project.fields = {};
  }

  getProjectMetas(): any {
    return new Promise((resolve, reject) => {
      const projectMetas = [{
        _id: '0',
        title: 'None',
        description: 'nothing in here',
        fields: []
      }, {
        _id: '1',
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
        _id: '2',
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
        _id: '0',
        title: 'Super User',
        description: 'Super User who can do anything.',
        isSuperUser: true,
        canModifyUsersRole: true,
        canModifyLocations: true,
        canModifyProjects: true,
        canModifyMilestones: true,
        canModifyPulses: true
      }, {
        _id: '1',
        title: 'Project Manager',
        description: 'Just some designation',
        isSuperUser: false,
        canModifyUsersRole: true,
        canModifyLocations: true,
        canModifyProjects: true,
        canModifyMilestones: true,
        canModifyPulses: true
      }, {
        _id: '2',
        title: 'Project Member',
        description: 'Just some designation',
        isSuperUser: false,
        canModifyUsersRole: false,
        canModifyLocations: true,
        canModifyProjects: false,
        canModifyMilestones: false,
        canModifyPulses: true
      }, {
        _id: '3',
        title: 'That one guy',
        description: 'Just some designation',
        isSuperUser: false,
        canModifyUsersRole: false,
        canModifyLocations: true,
        canModifyProjects: false,
        canModifyMilestones: false,
        canModifyPulses: false
      }];
      this.allRoles = roles;
      resolve(true);
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

  updateProject(): void {
    this.isUpdating = true;
    setTimeout(() => {
      this.isUpdating = false;
    }, 2500);
  }

}
