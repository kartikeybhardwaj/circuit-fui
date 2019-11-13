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
import {
  LocationStorageService
} from '../locations/locations.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

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

  isFetching = false;
  isFetchingSuccess = false;
  isAddingTravel = false;
  isUpdatingBaseLocation = false;

  travellingLocation: AddTravelData = {
    locationId: '',
    timeline: {
      begin: null,
      end: null
    }
  };

  MYTRAVELS_DATA: TravelData[];
  dataSourceMyTravels: MatTableDataSource < TravelData > ;
  columnsForMyTravels = ['index', 'name', 'timeline', 'todo'];
  columnsToDisplayMyTravels = ['#', 'Location', 'Timeline', ''];
  expandedElementMyTravels: TravelData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMyTravels: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMyTravels: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public travelsInfo: TravelsStorageService,
    public locationInfo: LocationStorageService,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Travels';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.isFetching = true;
    this.isFetchingSuccess = false;
    this.travelsInfo.getMyTravels()
      .then((travels) => {
        this.fillData();
        this.isFetching = false;
        this.isFetchingSuccess = true;
      })
      .catch((error) => {
        this.isFetching = false;
        this.isFetchingSuccess = false;
      });
  }

  createReqObjectToUpdateBaseLocation(): any {
    return {
      locationId: this.appInfo.user.baseLocation
    };
  }

  updateBaseLocation(): void {
    const reqPayload = this.createReqObjectToUpdateBaseLocation();
    this.isUpdatingBaseLocation = true;
    this.travelsInfo.updateBaseLocation(reqPayload)
      .then((resp) => {
        this.isUpdatingBaseLocation = false;
        this.openSnackBar(resp[1], null);
      })
      .catch((error) => {
        this.isUpdatingBaseLocation = false;
        this.openSnackBar(error[1], null);
      });
  }

  createReqObjectToAddTravel(): AddTravelData {
    return this.travellingLocation;
  }

  addTravel(): void {
    const reqPayload = this.createReqObjectToAddTravel();
    this.isAddingTravel = true;
    this.travelsInfo.addTravel(reqPayload)
      .then((resp) => {
        this.isAddingTravel = false;
        this.openSnackBar(resp[1], null);
      })
      .catch((error) => {
        this.isAddingTravel = false;
        this.openSnackBar(error[1], null);
      });
  }

  fillData(): void {
    this.MYTRAVELS_DATA = this.travelsInfo.travels;
    this.dataSourceMyTravels = new MatTableDataSource(this.MYTRAVELS_DATA);
    this.dataSourceMyTravels.paginator = this.paginatorMyTravels;
    this.dataSourceMyTravels.sort = this.sortMyTravels;
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center', // left, right, start, end, center
      verticalPosition: 'bottom', // top, bottom
      duration: 3500
    });
  }

}
