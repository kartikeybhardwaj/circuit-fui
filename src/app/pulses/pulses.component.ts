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

@Component({
  selector: 'app-pulses',
  templateUrl: './pulses.component.html',
  styleUrls: ['./pulses.component.css']
})
export class PulsesComponent implements OnInit {

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
    appInfo.navigationAddText = appInfo.constants.buildingBlocks.labels.addProject;
    appInfo.isNavigationAddTextVisible = true;
  }

  ngOnInit() {}

}
