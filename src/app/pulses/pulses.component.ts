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
  from: string;
  to: string;
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
    this.PULSES_DATA = [{
      index: 1,
      _id: '1234567890',
      title: 'this is some title',
      description: 'this is some description',
      timeline: {
        from: this.appInfo.getShortDate(new Date().getTime()),
        to: this.appInfo.getShortDate(new Date().getTime())
      },
      assigneesList: [{
        _id: '1234567890',
        name: 'some username'
      }, {
        _id: '1234567890',
        name: 'another username'
      }],
      assigneesListCount: 2,
      comments: [],
      pulseMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }, {
      index: 2,
      _id: '1234567890',
      title: 'this is some random title',
      description: 'this is some description',
      timeline: {
        from: this.appInfo.getShortDate(new Date().getTime()),
        to: this.appInfo.getShortDate(new Date().getTime())
      },
      assigneesList: [{
        _id: '1234567890',
        name: 'some username'
      }, {
        _id: '1234567890',
        name: 'another username'
      }],
      assigneesListCount: 2,
      comments: [],
      pulseMetaId: 'string',
      fields: [{
        key: 'key_1',
        key_1: 'value_1'
      }, {
        key: 'key_2',
        key_2: 'value_2'
      }, {
        key: 'key_3',
        key_3: 'value_3'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    }];
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
