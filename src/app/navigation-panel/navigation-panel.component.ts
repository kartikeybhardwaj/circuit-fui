import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef
} from '@angular/material/bottom-sheet';
import {
  AppStorageService
} from '../app.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) {}

  ngOnInit() {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  addBlocks(): void {
    if (this.appInfo.isNavigationAddTextVisible) {
      if (this.appInfo.navigationAddText === this.appInfo.constants.buildingBlocks.labels.addProject) {
        this.router.navigate(['/project/add']);
      } else if (this.appInfo.navigationAddText === this.appInfo.constants.buildingBlocks.labels.addMilestone) {
        this.router.navigate(['/project/project_id/milestone/add']);
      } else if (this.appInfo.navigationAddText === this.appInfo.constants.buildingBlocks.labels.addPulse) {
        this.router.navigate(['/project/project_id/milestone/milestone_id/pulse/add']);
      }
    }
  }

  openMenuBottomSheet(): void {
    // tslint:disable-next-line: no-use-before-declare
    this.bottomSheet.open(BottomSheetMenu);
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bottom-sheet-menu',
  templateUrl: 'bottom-sheet-menu.html',
})
// tslint:disable-next-line: component-class-suffix
export class BottomSheetMenu {

  constructor(
    public appInfo: AppStorageService,
    private bottomSheetRef: MatBottomSheetRef < BottomSheetMenu > ,
    private router: Router
  ) {}

  gotoMilestone(projectIndex: any): void {
    this.dissmissBottomSheet();
    this.router.navigate(['/projects/project_id/milestones']);
  }

  dissmissBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }
}
