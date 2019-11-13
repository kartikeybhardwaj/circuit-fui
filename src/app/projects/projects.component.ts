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
import {
  ProjectStorageService
} from './projects.service';
import {
  RoleStorageService
} from '../roles/roles.service';

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

  PROJECTS_DATA: ProjectData[];
  dataSourceProjects: MatTableDataSource < ProjectData > ;
  columnsForProjects = ['index', 'title', 'milestonesListCount', 'visibilityIcon', 'todo'];
  columnsToDisplayProjects = ['#', 'Projects', 'Milestones count', 'Visibility', ''];
  expandedElementProjects: ProjectData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorProjects: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortProjects: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public projectInfo: ProjectStorageService,
    public roleInfo: RoleStorageService,
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
    this.PROJECTS_DATA = JSON.parse(JSON.stringify(this.projectInfo.projects));
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

  editProjectClick(project: ProjectData): void {
    this.router.navigate(['/project/' + project.projectId + '/edit']);
  }

  gotoMilestoneClick(project: ProjectData): void {
    this.router.navigate(['/projects/' + project.projectId + '/milestones']);
  }

  gotoThisMilestone(projectId: string, milestoneId: string): void {
    this.router.navigate(['/projects/' + projectId + '/milestones/' + milestoneId + '/pulses']);
  }

  showUserCalendar(username: string): void {
    if (this.appInfo.user.isSuperuser) {
      this.router.navigate(['/users/' + username]);
    }
  }

}
