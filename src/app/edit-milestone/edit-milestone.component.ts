import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  EditMilestoneStorageService
} from './edit-milestone.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  LocationStorageService
} from '../locations/locations.service';
import {
  MetaMilestonesStorageService
} from '../meta-milestones/meta-milestones.service';

@Component({
  selector: 'app-edit-milestone',
  templateUrl: './edit-milestone.component.html',
  styleUrls: ['./edit-milestone.component.css']
})
export class EditMilestoneComponent implements OnInit {

  milestone: AddMilestoneData = {
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    locationId: null,
    milestoneMetaId: null,
    fields: [],
    linkedProjectId: null
  };
  selectedMilestoneMeta: any = null;
  timeline = null;
  isUpdating = false;

  constructor(
    public appInfo: AppStorageService,
    public locationInfo: LocationStorageService,
    public metaMilestonesInfo: MetaMilestonesStorageService,
    private editMilestoneInfo: EditMilestoneStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params &&
      activatedRouteSnapshot.params.projectId &&
      activatedRouteSnapshot.params.milestoneId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
      appInfo.selectedMilestoneId = activatedRouteSnapshot.params.milestoneId;
    }
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Edit Milestone';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    if (this.editMilestoneInfo.milestone.title === '') {
      this.editMilestoneInfo.getMilestone(this.appInfo.selectedProjectId, this.appInfo.selectedMilestoneId)
        .then((response: any) => {
          this.milestone = this.editMilestoneInfo.milestone;
          this.selectedMilestoneMeta = this.editMilestoneInfo.selectedMilestoneMeta;
          this.timeline = this.editMilestoneInfo.timeline;
        })
        .catch((error: any) => {
          this.openSnackBar(error, null);
        });
    } else {
      this.milestone = this.editMilestoneInfo.milestone;
      this.selectedMilestoneMeta = this.editMilestoneInfo.selectedMilestoneMeta;
      this.timeline = this.editMilestoneInfo.timeline;
    }
  }

  changedMilestoneMeta(event: any): void {
    this.milestone.fields = [];
    event.value.fields.forEach(field => {
      this.milestone.fields.push({
        key: field.key,
        value: null
      });
    });
    this.milestone.milestoneMetaId = event.value.metaMilestoneId;
  }

  updateMilestone(): void {
    this.isUpdating = true;
    setTimeout(() => {
      this.isUpdating = false;
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
