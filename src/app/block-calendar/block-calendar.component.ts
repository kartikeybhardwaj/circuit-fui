import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
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
  BlockagesStorageService
} from './block-calendar.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-block-calendar',
  templateUrl: './block-calendar.component.html',
  styleUrls: ['./block-calendar.component.css'],
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
export class BlockCalendarComponent implements OnInit {

  isFetching = false;
  isFetchingSuccess = false;
  isAddingBlockage = false;

  addNonAvailability: AddNonAvailabilityData = {
    reason: '',
    timeline: {
      begin: null,
      end: null
    }
  };

  MYBLOCKAGES_DATA: NonAvailabilityData[];
  dataSourceMyBlockages: MatTableDataSource < NonAvailabilityData > ;
  columnsForMyBlockages = ['index', 'reason', 'timeline', 'todo'];
  columnsToDisplayMyBlockages = ['#', 'Reason', 'Timeline', ''];
  expandedElementMyBlockages: NonAvailabilityData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMyBlockages: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMyBlockages: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public blockagesInfo: BlockagesStorageService,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Block Calendar';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.isFetching = false;
    this.isFetchingSuccess = false;
    this.blockagesInfo.getMyBlockages()
      .then((myBlockages) => {
        this.isFetching = false;
        this.isFetchingSuccess = true;
        this.fillData();
      })
      .catch((error) => {
        this.isFetching = false;
        this.isFetchingSuccess = false;
      });
  }

  createReqObjectToAddNonAvailability(): AddNonAvailabilityData {
    return this.addNonAvailability;
  }

  addBlockage(): void {
    const reqPayload = this.createReqObjectToAddNonAvailability();
    this.isAddingBlockage = true;
    this.blockagesInfo.addBlockage(reqPayload)
      .then((resp) => {
        this.isAddingBlockage = false;
        this.openSnackBar(resp[1], null);
      })
      .catch((error) => {
        this.isAddingBlockage = false;
        this.openSnackBar(error[1], null);
      });
  }

  fillData(): void {
    this.MYBLOCKAGES_DATA = this.blockagesInfo.nonAvailability;
    this.dataSourceMyBlockages = new MatTableDataSource(this.MYBLOCKAGES_DATA);
    this.dataSourceMyBlockages.paginator = this.paginatorMyBlockages;
    this.dataSourceMyBlockages.sort = this.sortMyBlockages;
    this.isFetching = false;
  }

  applyFilter(filterValue: string) {
    this.dataSourceMyBlockages.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceMyBlockages.paginator) {
      this.dataSourceMyBlockages.paginator.firstPage();
    }
  }

  updateBlockage(element): void {
    element.isUpdating = true;
    setTimeout(() => {
      element.isUpdating = false;
    }, 3000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center', // left, right, start, end, center
      verticalPosition: 'bottom', // top, bottom
      duration: 3500
    });
  }

}
