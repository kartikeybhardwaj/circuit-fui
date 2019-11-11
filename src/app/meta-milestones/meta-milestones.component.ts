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
  MetaMilestonesStorageService
} from './meta-milestones.service';
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
  selector: 'app-meta-milestones',
  templateUrl: './meta-milestones.component.html',
  styleUrls: ['./meta-milestones.component.css'],
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
export class MetaMilestonesComponent implements OnInit {

  isFetching = true;

  METAMILESTONES_DATA: MetaMilestoneData[];
  dataSourceMetaMilestones: MatTableDataSource < MetaMilestoneData > ;
  columnsForMetaMilestones = ['index', 'title', 'todo'];
  columnsToDisplayMetaMilestones = ['#', 'Meta Milestones', ''];
  expandedElementMetaMilestones: MetaMilestoneData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMetaMilestones: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMetaMilestones: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public metaMilestoneInfo: MetaMilestonesStorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addMetaMilestone;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {
    this.metaMilestoneInfo.getMetaMilestones()
      .then((metaMilestones) => {
        this.fillData();
        this.isFetching = false;
      })
      .catch((error) => {
        this.isFetching = false;
        this.openSnackBar(error, null);
      });
  }

  fillData(): void {
    this.METAMILESTONES_DATA = JSON.parse(JSON.stringify(this.metaMilestoneInfo.metaMilestones.slice(1)));
    this.dataSourceMetaMilestones = new MatTableDataSource(this.METAMILESTONES_DATA);
    this.dataSourceMetaMilestones.paginator = this.paginatorMetaMilestones;
    this.dataSourceMetaMilestones.sort = this.sortMetaMilestones;
  }

  applyFilter(filterValue: string): void {
    this.dataSourceMetaMilestones.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceMetaMilestones.paginator) {
      this.dataSourceMetaMilestones.paginator.firstPage();
    }
  }

  editMetaMilestoneClick(metaMilestone: MetaMilestoneData): void {
    console.log(metaMilestone);
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
