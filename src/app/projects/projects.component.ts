import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  Router
} from '@angular/router';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export interface ProjectsList {
  index: number;
  _id: string;
  title: string;
  description: string;
  visibility: string;
  visibilityIcon: string;
  members: MembersList[];
  milestonesList: string[];
  milestonesListCount: number;
  projectMetaId: string;
  fields: any[];
  meta: ProjectsMeta;
}

export interface MembersList {
  _id: string;
  name: string;
  roleId: string;
  roleName: string;
}

export interface ProjectsMeta {
  addedBy: string;
  addedOn: string;
  lastUpdatedBy: string;
  lastUpdatedOn: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({
        height: '0px',
        minHeight: '0'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProjectsComponent implements OnInit {

  isFetching = true;

  PROJECTS_DATA: ProjectsList[];
  dataSourceProjects: MatTableDataSource < ProjectsList > ;
  columnsForProjects = ['index', 'title', 'milestonesListCount', 'visibilityIcon', 'gotoMilestone'];
  columnsToDisplayProjects = ['#', 'Projects', 'Milestones count', 'Visibility', ''];
  expandedElementProjects: ProjectsList | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorProjects: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortProjects: MatSort;

  constructor(
    public appInfo: AppStorageService,
    private router: Router
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addProject;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {
    this.PROJECTS_DATA = [{
      index: 1,
      _id: '1234567890',
      title: 'this is some title',
      description: 'this is some description',
      visibility: 'public',
      visibilityIcon: 'public',
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 2,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'public',
      visibilityIcon: 'public',
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 3,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'private',
      visibilityIcon: this.appInfo.constants.buildingBlocks.icons.private,
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 4,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'internal',
      visibilityIcon: this.appInfo.constants.buildingBlocks.icons.internal,
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 5,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'public',
      visibilityIcon: 'public',
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 6,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'public',
      visibilityIcon: 'public',
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 7,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'public',
      visibilityIcon: 'public',
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 8,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      visibility: 'public',
      visibilityIcon: 'public',
      members: [{
        _id: '1234567890',
        name: 'some user',
        roleId: '2',
        roleName: 'Project Manager',

      }, {
        _id: '1234567890',
        name: 'some user',
        roleId: '4',
        roleName: 'That one guy',

      }],
      milestonesList: ['0', '1', '2', '3'],
      milestonesListCount: 4,
      projectMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }];
    this.appInfo.projects = this.PROJECTS_DATA;
    this.dataSourceProjects = new MatTableDataSource(this.PROJECTS_DATA);
    this.dataSourceProjects.paginator = this.paginatorProjects;
    this.dataSourceProjects.sort = this.sortProjects;
    this.isFetching = false;
  }

  applyFilter(filterValue: string): void {
    this.dataSourceProjects.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceProjects.paginator) {
      this.dataSourceProjects.paginator.firstPage();
    }
  }

  // changedMemberRole(projectId: string, member: MembersList, memberId: string, roleId: string): void {
  //   member.isUpdatingRole = true;
  //   setTimeout(() => {
  //     member.isUpdatingRole = false;
  //   }, 2000);
  //   console.log(projectId, memberId, roleId);
  // }

  projectClick(project: ProjectsList): void {
    console.log(project);
    this.router.navigate(['/projects/project_name/milestones']);
  }

}
