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
import {
  ProjectStorageService
} from '../projects/projects.service';
import {
  RoleStorageService
} from '../roles/roles.service';

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

  PULSES_DATA: PulseData[];
  dataSourcePulses: MatTableDataSource < PulseData > ;
  columnsForPulses = ['index', 'title', 'timeline', 'assigneesListCount', 'todo'];
  columnsToDisplayPulses = ['#', 'Pulse', 'End date', 'Assignees count', ''];
  expandedElementPulses: PulseData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorPulses: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortPulses: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public projectInfo: ProjectStorageService,
    public roleInfo: RoleStorageService,
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
    appInfo.isNavigationAddTextVisible = this.shallDisplayNavigationAddText();
  }

  shallDisplayNavigationAddText(): boolean {
    let canModifyPulses = false;
    this.projectInfo.projects.some(project => {
      if (project.projectId === this.appInfo.selectedProjectId) {
        let myRoleId = null;
        project.members.some(member => {
          myRoleId = member.roleId;
          return true;
        });
        this.roleInfo.roles.forEach(role => {
          if (role.roleId === myRoleId) {
            if (role.canModifyPulses) {
              canModifyPulses = true;
            }
          }
        });
        return true;
      }
    });
    return canModifyPulses;
  }

  ngOnInit() {
    this.pulseInfo.getPulses(this.appInfo.selectedProjectId, this.appInfo.selectedMilestoneId)
      .then((pulses) => {
        this.fillData();
      })
      .catch((error) => {});
  }

  fillData(): void {
    this.PULSES_DATA = this.pulseInfo.pulses;
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

  editPulseClick(pulse: PulseData): void {
    console.log(pulse);
    this.router.navigate(['/project/' + this.appInfo.selectedProjectId +
      '/milestone/' + this.appInfo.selectedMilestoneId +
      '/pulse/' + pulse.pulseId + '/edit'
    ]);
  }

}
