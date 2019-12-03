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

  milestone: EditMilestoneData = {
    projectId: '',
    milestoneId: '',
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    locationId: null,
    milestoneMetaId: null,
    fields: []
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

  createReqObject(): EditMilestoneData {
    if (this.timeline && this.timeline.begin && this.timeline.end) {
      this.milestone.timeline.begin = this.timeline.begin.toISOString();
      this.milestone.timeline.end = this.timeline.end.toISOString();
    }
    return this.milestone;
  }

  updateMilestone(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.editMilestoneInfo.validateRequest(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isUpdating = true;
      this.editMilestoneInfo.updateMilestone(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isUpdating = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            this.router.navigate(['/projects/' + this.appInfo.selectedProjectId + '/milestones']);
          }
        })
        .catch((error: [boolean, string, any]) => {
          this.isUpdating = false;
          this.openSnackBar(error[1], null);
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
