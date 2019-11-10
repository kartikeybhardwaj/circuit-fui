import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HomeStorageService
} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    public homeInfo: HomeStorageService
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.homeInfo.getMyPulses();
  }

  pulseClick(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info.event);
  }

  pulseDrop(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info.event);
  }

  pulseResize(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info.event);
  }

}
