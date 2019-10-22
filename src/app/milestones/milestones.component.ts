import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  ActivatedRoute,
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
  MilestoneStorageService
} from './milestones.service';

export interface MilestonesList {
  index: number;
  _id: string;
  title: string;
  description: string;
  timeline: Timeline;
  pulsesList: Pulse[];
  pulsesListCount: number;
  milestoneMetaId: string;
  fields: any[];
  meta: MilestonesMeta;
}

export interface Timeline {
  begin: string;
  end: string;
}

export interface Pulse {
  _id: string;
  title: string;
}

export interface MilestonesMeta {
  addedBy: string;
  addedOn: string;
  lastUpdatedBy: string;
  lastUpdatedOn: string;
}

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css'],
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
export class MilestonesComponent implements OnInit {

  isFetching = true;

  MILESTONES_DATA: MilestonesList[];
  dataSourceMilestones: MatTableDataSource < MilestonesList > ;
  columnsForMilestones = ['index', 'title', 'timeline', 'pulsesListCount', 'todo'];
  columnsToDisplayMilestones = ['#', 'Milestone', 'End date', 'Pulses count', ''];
  expandedElementMilestones: MilestonesList | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMilestones: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMilestones: MatSort;

  constructor(
    public appInfo: AppStorageService,
    private milestoneInfo: MilestoneStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params && activatedRouteSnapshot.params.projectId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
    }
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addMilestone;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {
    if (this.appInfo.milestones) {
      this.fillData();
    } else {
      this.milestoneInfo.getMilestones()
        .then((milestones) => {
          this.fillData();
        })
        .catch((error) => {});
    }
  }

  fillData(): void {
    this.appInfo.milestones = this.MILESTONES_DATA;
    this.dataSourceMilestones = new MatTableDataSource(this.MILESTONES_DATA);
    this.dataSourceMilestones.paginator = this.paginatorMilestones;
    this.dataSourceMilestones.sort = this.sortMilestones;
    this.isFetching = false;
  }

  applyFilter(filterValue: string) {
    this.dataSourceMilestones.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceMilestones.paginator) {
      this.dataSourceMilestones.paginator.firstPage();
    }
  }

  milestoneClick(milestone: MilestonesList) {
    console.log(milestone);
    this.router.navigate(['/projects/project_name/milestones/milestone_name/pulses']);
  }

}
