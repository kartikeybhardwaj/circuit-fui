import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService
  ) {
    appInfo.headerText = 'This is project name';
  }

  ngOnInit() {}

}
