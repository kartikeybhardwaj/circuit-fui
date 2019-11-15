import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  AddMilestoneStorageService
} from './add-milestone.service';
import {
  MetaMilestonesStorageService
} from '../meta-milestones/meta-milestones.service';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.css']
})
export class AddMilestoneComponent implements OnInit {

  milestone: AddMilestoneData = {
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    milestoneMetaId: null,
    fields: [],
    linkedProjectId: null
  };
  selectedMilestoneMeta: any = null;
  timeline = null;
  isAdding = false;

  constructor(
    public appInfo: AppStorageService,
    public metaMilestonesInfo: MetaMilestonesStorageService,
    private addMilestoneInfo: AddMilestoneStorageService,
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
    appInfo.otherHeader = 'Add Milestone';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {}

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

  createReqObject(): AddMilestoneData {
    if (this.timeline && this.timeline.begin && this.timeline.end) {
      this.milestone.timeline.begin = this.timeline.begin.toISOString();
      this.milestone.timeline.end = this.timeline.end.toISOString();
      this.milestone.linkedProjectId = this.appInfo.selectedProjectId;
    }
    return this.milestone;
  }

  addMilestone(): void {
    const reqPayload = this.createReqObject();
    const afterValidateReqPayload = this.addMilestoneInfo.validateRequest(reqPayload);
    if (!afterValidateReqPayload[0]) {
      this.openSnackBar(afterValidateReqPayload[1], null);
    } else {
      this.isAdding = true;
      this.addMilestoneInfo.addMilestone(reqPayload)
        .then((resp: [boolean, string, any]) => {
          this.isAdding = false;
          this.openSnackBar(resp[1], null);
          if (resp[0]) {
            this.router.navigate(['/projects/' + this.appInfo.selectedProjectId + '/milestones/' + resp[2]._id + '/pulses']);
          }
        })
        .catch((error: [boolean, string, any]) => {
          this.isAdding = false;
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
