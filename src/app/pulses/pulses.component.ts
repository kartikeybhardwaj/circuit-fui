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
  PulseStorageService
} from './pulses.service';

export interface PulsesList {
  index: number;
  _id: string;
  title: string;
  description: string;
  timeline: Timeline;
  assigneesList: Assignee[];
  assigneesListCount: number;
  comments: Comments[];
  pulseMetaId: string;
  fields: any[];
  meta: PulsesMeta;
}

export interface Timeline {
  begin: string;
  end: string;
}

export interface Assignee {
  _id: string;
  name: string;
}

export interface PulsesMeta {
  addedBy: string;
  addedOn: string;
  lastUpdatedBy: string;
  lastUpdatedOn: string;
}

export interface Comments {
  index: number;
  comment: string;
  meta: CommentsMeta;
}

export interface CommentsMeta {
  addedBy: string;
  addedOn: string;
}

@Component({
  selector: 'app-pulses',
  templateUrl: './pulses.component.html',
  styleUrls: ['./pulses.component.css'],
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
export class PulsesComponent implements OnInit {

  isFetching = true;

  PULSES_DATA: PulsesList[];
  dataSourcePulses: MatTableDataSource < PulsesList > ;
  columnsForPulses = ['index', 'title', 'timeline', 'assigneesListCount', 'todo'];
  columnsToDisplayPulses = ['#', 'Pulse', 'End date', 'Assignees count', ''];
  expandedElementPulses: PulsesList | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorPulses: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortPulses: MatSort;

  constructor(
    public appInfo: AppStorageService,
    private pulseInfo: PulseStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params &&
      activatedRouteSnapshot.params.projectId &&
      activatedRouteSnapshot.params.milestoneId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
      appInfo.selectedMilestoneId = activatedRouteSnapshot.params.milestoneId;
    }
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addPulse;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {
    if (this.appInfo.pulses) {
      this.fillData();
    } else {
      this.pulseInfo.getPulses()
        .then((pulses) => {
          this.fillData();
        })
        .catch((error) => {});
    }
  }

  fillData(): void {
    this.PULSES_DATA = this.appInfo.pulses;
    this.appInfo.pulses = this.PULSES_DATA;
    this.dataSourcePulses = new MatTableDataSource(this.PULSES_DATA);
    this.dataSourcePulses.paginator = this.paginatorPulses;
    this.dataSourcePulses.sort = this.sortPulses;
    this.isFetching = false;
  }

  applyFilter(filterValue: string) {
    this.dataSourcePulses.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcePulses.paginator) {
      this.dataSourcePulses.paginator.firstPage();
    }
  }

  pulseClick(pulse: PulsesList) {
    console.log(pulse);
    this.router.navigate(['/projects/project_name/milestones/milestone_name/pulses']);
  }

}
