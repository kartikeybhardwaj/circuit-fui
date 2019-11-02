import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HeaderStorageService
} from './header.service';
import {
  ProjectStorageService
} from '../projects/projects.service';
import {
  MilestoneStorageService
} from '../milestones/milestones.service';
import {
  PulseStorageService
} from '../pulses/pulses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  today: string;

  constructor(
    public appInfo: AppStorageService,
    public headerInfo: HeaderStorageService,
    public projectInfo: ProjectStorageService,
    public milestoneInfo: MilestoneStorageService,
    public pulseInfo: PulseStorageService
  ) {
    this.today = appInfo.getShortDate(new Date().getTime());
  }

  ngOnInit() {}

}
