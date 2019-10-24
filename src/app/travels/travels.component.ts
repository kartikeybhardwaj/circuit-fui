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
  TravelsStorageService
} from './travels.service';

export interface MyTravelsList {
  index: number;
  _id: string;
  name: string;
  timeline: Timeline;
  isUpdating: boolean;
}

export interface Timeline {
  begin: string;
  end: string;
}

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css'],
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
export class TravelsComponent implements OnInit {

  isFetching = true;
  isFetchingSuccess = false;
  isAddingTravel = false;
  isUpdatingBaseLocation = false;

  travellingLocationId = '';
  travellingLocationTimeline: any = {};

  MYTRAVELS_DATA: MyTravelsList[];
  dataSourceMyTravels: MatTableDataSource < MyTravelsList > ;
  columnsForMyTravels = ['index', 'name', 'timeline', 'todo'];
  columnsToDisplayMyTravels = ['#', 'Location', 'Timeline', ''];
  expandedElementMyTravels: MyTravelsList | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMyTravels: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMyTravels: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public travelsInfo: TravelsStorageService
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Travels';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    if (this.appInfo.allLocations) {
      if (this.appInfo.myTravels) {
        this.isFetching = false;
        this.isFetchingSuccess = true;
        this.fillData();
      } else {
        this.travelsInfo.getMyTravels()
          .then((myTravels) => {
            this.isFetching = false;
            this.isFetchingSuccess = true;
            this.fillData();
          })
          .catch((error) => {
            this.isFetching = false;
            this.isFetchingSuccess = false;
          });
      }
    } else {
      this.travelsInfo.getAllLocations()
        .then((allLocations) => {
          this.travelsInfo.getMyTravels()
            .then((myTravels) => {
              this.isFetching = false;
              this.isFetchingSuccess = true;
              this.fillData();
            })
            .catch((error) => {
              this.isFetching = false;
              this.isFetchingSuccess = false;
            });
        })
        .catch((error) => {
          this.isFetching = false;
          this.isFetchingSuccess = false;
        });
    }
  }

  updateBaseLocation(): void {
    this.isUpdatingBaseLocation = true;
    setTimeout(() => {
      this.isUpdatingBaseLocation = false;
    }, 3000);
  }

  addTravel(): void {
    this.isAddingTravel = true;
    setTimeout(() => {
      this.isAddingTravel = false;
    }, 3000);
  }

  fillData(): void {
    this.MYTRAVELS_DATA = this.appInfo.myTravels;
    this.dataSourceMyTravels = new MatTableDataSource(this.MYTRAVELS_DATA);
    this.dataSourceMyTravels.paginator = this.paginatorMyTravels;
    this.dataSourceMyTravels.sort = this.sortMyTravels;
    this.isFetching = false;
  }

  applyFilter(filterValue: string) {
    this.dataSourceMyTravels.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceMyTravels.paginator) {
      this.dataSourceMyTravels.paginator.firstPage();
    }
  }

  updateTravel(element): void {
    element.isUpdating = true;
    setTimeout(() => {
      element.isUpdating = false;
    }, 3000);
  }

}
