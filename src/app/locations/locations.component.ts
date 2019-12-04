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
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  LocationStorageService
} from './locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
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
export class LocationsComponent implements OnInit {

  addLocation: AddLocationsData = {
    names: [{
      country: '',
      city: ''
    }]
  };
  isAddingLocation = false;

  LOCATIONS_DATA: LocationData[];
  dataSourceLocations: MatTableDataSource < LocationData > ;
  columnsForLocations = ['index', 'country', 'city', 'todo'];
  columnsToDisplayLocations = ['#', 'Country', 'City', ''];
  expandedElementLocations: LocationData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorLocations: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortLocations: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public locationsInfo: LocationStorageService,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Locations';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.fillData();
  }

  addLocations(): void {
    const reqPayload = this.addLocation;
    const afterValidateReqPayload = this.locationsInfo.validateRequest(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isAddingLocation = true;
      this.locationsInfo.addLocations(reqPayload)
        .then((resp) => {
          this.isAddingLocation = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            this.fillData();
          }
        })
        .catch((error) => {
          this.isAddingLocation = false;
          this.openSnackBar(error[1], null);
        });
    }
  }

  fillData(): void {
    this.LOCATIONS_DATA = this.locationsInfo.locations;
    this.dataSourceLocations = new MatTableDataSource(this.LOCATIONS_DATA);
    this.dataSourceLocations.paginator = this.paginatorLocations;
    this.dataSourceLocations.sort = this.sortLocations;
  }

  applyFilter(filterValue: string) {
    this.dataSourceLocations.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceLocations.paginator) {
      this.dataSourceLocations.paginator.firstPage();
    }
  }

  updateLocation(element): void {
    element.isUpdating = true;
    setTimeout(() => {
      element.isUpdating = false;
    }, 3000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
