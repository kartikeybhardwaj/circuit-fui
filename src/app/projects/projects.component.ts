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
  milestonesList: Milestone[];
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

export interface Milestone {
  _id: string;
  title: string;
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
  columnsForProjects = ['index', 'title', 'milestonesListCount', 'visibilityIcon', 'todo'];
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
    this.PROJECTS_DATA = this.appInfo.projects;
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

  editProjectClick(project: ProjectsList): void {
    console.log(project);
    this.router.navigate(['/project/project_id/edit']);
  }

  gotoMilestoneClick(project: ProjectsList): void {
    console.log(project);
    this.router.navigate(['/projects/project_name/milestones']);
  }

}
