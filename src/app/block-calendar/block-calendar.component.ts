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

export interface MyBlockagesList {
  index: number;
  reason: string;
  timeline: Timeline;
  isUpdating: boolean;
}

export interface Timeline {
  begin: string;
  end: string;
}

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

  isFetching = true;
  isFetchingSuccess = false;
  isAddingBlockage = false;

  blockageReason = '';
  blockageTimeline: any = {};

  MYBLOCKAGES_DATA: MyBlockagesList[];
  dataSourceMyBlockages: MatTableDataSource < MyBlockagesList > ;
  columnsForMyBlockages = ['index', 'reason', 'timeline', 'todo'];
  columnsToDisplayMyBlockages = ['#', 'Reason', 'Timeline', ''];
  expandedElementMyBlockages: MyBlockagesList | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMyBlockages: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMyBlockages: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public blockagesInfo: BlockagesStorageService
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Block Calendar';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    if (this.appInfo.myBlockages) {
      this.isFetching = false;
      this.isFetchingSuccess = true;
      this.fillData();
    } else {
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
  }

  addBlockage(): void {
    this.isAddingBlockage = true;
    setTimeout(() => {
      this.isAddingBlockage = false;
    }, 3000);
  }

  fillData(): void {
    this.MYBLOCKAGES_DATA = this.appInfo.myBlockages;
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

}
