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
import {
  EditProjectStorageService
} from '../edit-project/edit-project.service';
import {
  MetaProjectsStorageService
} from '../meta-projects/meta-projects.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

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
    private editProjectInfo: EditProjectStorageService,
    private metaProjectInfo: MetaProjectsStorageService,
    public roleInfo: RoleStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addProject;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {
    this.projectInfo.getProjects()
      .then((projects) => {
        this.fillData();
        this.isFetching = false;
      })
      .catch((error) => {
        this.isFetching = false;
        this.openSnackBar(error, null);
      });
  }

  fillData(): void {
    this.PROJECTS_DATA = JSON.parse(JSON.stringify(this.projectInfo.projects));
    this.dataSourceProjects = new MatTableDataSource(this.PROJECTS_DATA);
    this.dataSourceProjects.paginator = this.paginatorProjects;
    this.dataSourceProjects.sort = this.sortProjects;
  }

  applyFilter(filterValue: string): void {
    this.dataSourceProjects.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceProjects.paginator) {
      this.dataSourceProjects.paginator.firstPage();
    }
  }

  editProjectClick(project: ProjectData): void {
    this.editProjectInfo.project = {
      projectId: project.projectId,
      title: project.title,
      description: project.description,
      visibility: project.visibility,
      members: [],
      membersTodo: {
        toAdd: [],
        toRemove: []
      },
      projectMetaId: project.projectMetaId,
      fields: project.fields
    };
    this.editProjectInfo.initialMembers = [];
    project.members.forEach((member) => {
      this.editProjectInfo.initialMembers.push(this.projectInfo.idMapProjects[member.userId]);
      this.editProjectInfo.project.members.push({
        username: this.projectInfo.idMapProjects[member.userId],
        displayname: this.projectInfo.idMapProjects[member.userId],
        roleId: member.roleId
      });
    });
    this.metaProjectInfo.metaProjects.some((metaProject) => {
      if (metaProject.metaProjectId === project.projectMetaId) {
        this.editProjectInfo.selectedProjectMeta = metaProject;
        return true;
      }
    });
    this.router.navigate([
      '/projects/' +
      project.projectId +
      '/edit'
    ]);
  }

  gotoMilestoneClick(project: ProjectData): void {
    this.router.navigate([
      '/projects/' +
      project.projectId +
      '/milestones'
    ]);
  }

  gotoThisMilestone(projectId: string, milestoneId: string): void {
    this.router.navigate([
      '/projects/' +
      projectId +
      '/milestones/' +
      milestoneId +
      '/pulses'
    ]);
  }

  showUserCalendar(username: string): void {
    if (this.appInfo.user.isSuperuser) {
      this.router.navigate(['/users/' + username]);
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
