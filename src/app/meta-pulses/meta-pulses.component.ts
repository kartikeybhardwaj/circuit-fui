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
  MetaPulsesStorageService
} from './meta-pulses.service';
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
  selector: 'app-meta-pulses',
  templateUrl: './meta-pulses.component.html',
  styleUrls: ['./meta-pulses.component.css'],
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
export class MetaPulsesComponent implements OnInit {

  isFetching = true;

  METAPULSES_DATA: MetaPulseData[];
  dataSourceMetaPulses: MatTableDataSource < MetaPulseData > ;
  columnsForMetaPulses = ['index', 'title', 'todo'];
  columnsToDisplayMetaPulses = ['#', 'Meta Pulses', ''];
  expandedElementMetaPulses: MetaPulseData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMetaPulses: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMetaPulses: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public metaPulseInfo: MetaPulsesStorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addMetaPulse;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {
    this.metaPulseInfo.getMetaPulses()
      .then((metaPulses) => {
        this.fillData();
        this.isFetching = false;
      })
      .catch((error) => {
        this.isFetching = false;
        this.openSnackBar(error, null);
      });
  }

  fillData(): void {
    this.METAPULSES_DATA = JSON.parse(JSON.stringify(this.metaPulseInfo.metaPulses.slice(1)));
    this.dataSourceMetaPulses = new MatTableDataSource(this.METAPULSES_DATA);
    this.dataSourceMetaPulses.paginator = this.paginatorMetaPulses;
    this.dataSourceMetaPulses.sort = this.sortMetaPulses;
  }

  applyFilter(filterValue: string): void {
    this.dataSourceMetaPulses.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceMetaPulses.paginator) {
      this.dataSourceMetaPulses.paginator.firstPage();
    }
  }

  editMetaPulseClick(metaPulse: MetaPulseData): void {
    console.log(metaPulse);
    // this.router.navigate(['/project/' + project.projectId + '/edit']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center', // left, right, start, end, center
      verticalPosition: 'bottom', // top, bottom
      duration: 3500
    });
  }

}
