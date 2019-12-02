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
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  ProjectStorageService
} from '../projects/projects.service';
import {
  RoleStorageService
} from '../roles/roles.service';
import {
  LocationStorageService
} from '../locations/locations.service';
import {
  EditMilestoneStorageService
} from '../edit-milestone/edit-milestone.service';
import {
  MetaMilestonesStorageService
} from '../meta-milestones/meta-milestones.service';

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

  MILESTONES_DATA: MilestoneData[];
  dataSourceMilestones: MatTableDataSource < MilestoneData > ;
  columnsForMilestones = ['index', 'title', 'timeline', 'pulsesListCount', 'todo'];
  columnsToDisplayMilestones = ['#', 'Milestone', 'End date', 'Pulses count', ''];
  expandedElementMilestones: MilestoneData | null;

  @ViewChild(MatPaginator, {
    static: true
  }) paginatorMilestones: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sortMilestones: MatSort;

  constructor(
    public appInfo: AppStorageService,
    public projectInfo: ProjectStorageService,
    public roleInfo: RoleStorageService,
    public milestoneInfo: MilestoneStorageService,
    public locationInfo: LocationStorageService,
    private editMilestoneInfo: EditMilestoneStorageService,
    private metaMilestoneInfo: MetaMilestonesStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params && activatedRouteSnapshot.params.projectId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
    }
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addMilestone;
    appInfo.isNavigationAddTextVisible = this.shallDisplayNavigationAddText();
  }

  shallDisplayNavigationAddText(): boolean {
    let canModifyMilestones = false;
    if (this.appInfo.user.isSuperuser) {
      canModifyMilestones = true;
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
              if (role.canModifyMilestones) {
                canModifyMilestones = true;
              }
            }
          });
          return true;
        }
      });
    }
    return canModifyMilestones;
  }

  ngOnInit() {
    this.milestoneInfo.getMilestones(this.appInfo.selectedProjectId)
      .then((milestones) => {
        this.fillData();
        this.isFetching = false;
      })
      .catch((error) => {
        this.isFetching = false;
        this.openSnackBar(error, null);
      });
  }

  fillData(): void {
    this.MILESTONES_DATA = this.milestoneInfo.milestones;
    this.dataSourceMilestones = new MatTableDataSource(this.MILESTONES_DATA);
    this.dataSourceMilestones.paginator = this.paginatorMilestones;
    this.dataSourceMilestones.sort = this.sortMilestones;
  }

  applyFilter(filterValue: string) {
    this.dataSourceMilestones.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceMilestones.paginator) {
      this.dataSourceMilestones.paginator.firstPage();
    }
  }

  editMilestoneClick(milestone: MilestoneData): void {
    this.editMilestoneInfo.milestone = {
      title: milestone.title,
      description: milestone.description,
      timeline: {
        begin: new Date(milestone.timeline.begin).toISOString(),
        end: new Date(milestone.timeline.end).toISOString()
      },
      locationId: milestone.locationId,
      milestoneMetaId: milestone.milestoneMetaId,
      fields: milestone.fields,
      linkedProjectId: milestone.linkedProjectId
    };
    this.metaMilestoneInfo.metaMilestones.some((metaMilestone) => {
      if (metaMilestone.metaMilestoneId === milestone.milestoneMetaId) {
        this.editMilestoneInfo.selectedMilestoneMeta = metaMilestone;
        return true;
      }
    });
    this.editMilestoneInfo.timeline = {
      begin: new Date(milestone.timeline.begin),
      end: new Date(milestone.timeline.end)
    };
    this.router.navigate([
      '/projects/' +
      this.appInfo.selectedProjectId +
      '/milestones/' +
      milestone.milestoneId +
      '/edit'
    ]);
  }

  gotoPulseClick(milestone: MilestoneData) {
    this.router.navigate([
      '/projects/' +
      this.appInfo.selectedProjectId +
      '/milestones/' +
      milestone.milestoneId +
      '/pulses'
    ]);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
