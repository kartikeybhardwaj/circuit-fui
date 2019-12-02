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
import {
  MilestoneStorageService
} from '../milestones/milestones.service';
import {
  EditPulseStorageService
} from '../edit-pulse/edit-pulse.service';
import {
  MetaPulsesStorageService
} from '../meta-pulses/meta-pulses.service';

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
    private editPulseInfo: EditPulseStorageService,
    private metaPulseInfo: MetaPulsesStorageService,
    private pulseInfo: PulseStorageService,
    private milestoneInfo: MilestoneStorageService,
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
    if (this.appInfo.user.isSuperuser) {
      canModifyPulses = true;
    } else {
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
    }
    return canModifyPulses;
  }

  ngOnInit() {
    this.milestoneInfo.getMilestones(this.appInfo.selectedProjectId);
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
    this.editPulseInfo.pulse = {
      title: pulse.title,
      description: pulse.description,
      timeline: {
        begin: new Date(pulse.timeline.begin).toISOString(),
        end: new Date(pulse.timeline.end).toISOString()
      },
      color: pulse.color,
      assignees: pulse.assignees,
      pulseMetaId: pulse.pulseMetaId,
      fields: pulse.fields,
      linkedProjectId: pulse.linkedProjectId,
      linkedMilestoneId: pulse.linkedMilestoneId
    };
    this.metaPulseInfo.metaPulses.some((metaPulse) => {
      if (metaPulse.metaPulseId === pulse.pulseMetaId) {
        this.editPulseInfo.selectedPulseMeta = metaPulse;
        return true;
      }
    });
    this.editPulseInfo.timeline = {
      begin: new Date(pulse.timeline.begin),
      end: new Date(pulse.timeline.end)
    };
    this.router.navigate([
      '/projects/' +
      this.appInfo.selectedProjectId +
      '/milestones/' +
      this.appInfo.selectedMilestoneId +
      '/pulses/' +
      pulse.pulseId +
      '/edit'
    ]);
  }

  showUserCalendar(username: string): void {
    if (this.appInfo.user.isSuperuser) {
      this.router.navigate(['/users/' + username]);
    }
  }

}
