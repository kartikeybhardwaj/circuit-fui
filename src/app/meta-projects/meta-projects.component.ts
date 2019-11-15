import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
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
  MetaProjectsStorageService
} from './meta-projects.service';
import {
  AppStorageService
} from '../app.service';
import {
  Router
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-meta-projects',
  templateUrl: './meta-projects.component.html',
  styleUrls: ['./meta-projects.component.css'],
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
export class MetaProjectsComponent implements OnInit {

  isFetching = true;

  METAPROJECTS_DATA: MetaProjectData[];
  dataSourceMetaProjects: MatTableDataSource < MetaProjectData > ;
  columnsForMetaProjects = ['index', 'title', 'todo'];
  columnsToDisplayMetaProjects = ['#', 'Meta Projects', ''];
  expandedElementMetaProjects: MetaProjectData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMetaProjects: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMetaProjects: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public metaProjectInfo: MetaProjectsStorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addMetaProject;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {
    this.metaProjectInfo.getMetaProjects()
      .then((metaProjects) => {
        this.fillData();
        this.isFetching = false;
      })
      .catch((error) => {
        this.isFetching = false;
        this.openSnackBar(error, null);
      });
  }

  fillData(): void {
    this.METAPROJECTS_DATA = JSON.parse(JSON.stringify(this.metaProjectInfo.metaProjects.slice(1)));
    this.dataSourceMetaProjects = new MatTableDataSource(this.METAPROJECTS_DATA);
    this.dataSourceMetaProjects.paginator = this.paginatorMetaProjects;
    this.dataSourceMetaProjects.sort = this.sortMetaProjects;
  }

  applyFilter(filterValue: string): void {
    this.dataSourceMetaProjects.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceMetaProjects.paginator) {
      this.dataSourceMetaProjects.paginator.firstPage();
    }
  }

  editMetaProjectClick(metaProject: MetaProjectData): void {
    console.log(metaProject);
    // this.router.navigate(['/project/' + project.projectId + '/edit']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
