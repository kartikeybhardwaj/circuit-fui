import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    private router: Router
  ) {
    appInfo.headerText = 'Circuit projects';
  }

  ngOnInit() {}

  gotoMilestone(projectIndex: any): void {
    this.router.navigate(['milestones']);
  }

}
