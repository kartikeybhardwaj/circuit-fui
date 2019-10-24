import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AppStorageService
} from './app.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  ProjectStorageService
} from './projects/projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSiteLoading = true;

  constructor(
    public appInfo: AppStorageService,
    private projectsInfo: ProjectStorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getConstants().then((constants) => {
      this.getUser().then((user) => {
        this.projectsInfo.getProjects().then((projects) => {
          this.isSiteLoading = false;
        });
      });
    });
  }

  getConstants() {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.fetchConstantsURI, this.appInfo.httpOptions).subscribe(
        (response) => {
          this.appInfo.constants = response;
          resolve(true);
        },
        (error) => {
          reject(false);
        }
      );
    });
  }

  getUser(): any {
    // get user data and set to appInfo.user
    return new Promise((resolve, reject) => {
      this.appInfo.user = {
        _id: '1',
        index: '1',
        username: 'kartoon',
        displayname: 'kartoon',
        baseLocation: '1',
        otherLocations: [{
          locationId: '2',
          timeline: {
            begin: new Date(),
            end: new Date()
          }
        }, {
          locationId: '3',
          timeline: {
            begin: new Date(),
            end: new Date()
          }
        }],
        nonAvailability: [{
          reason: 'just not available',
          timeline: {
            begin: new Date(),
            end: new Date()
          }
        }],
        access: {
          projects: [{
            projectId: 'ObjectId()',
            milestones: [{
              milestoneId: 'ObjectId()',
              pulses: [{
                pulseId: 'ObjectId()'
              }]
            }]
          }]
        },
        meta: {
          addedBy: 'ObjectId()',
          addedOn: new Date(),
          lastSeen: new Date()
        }
      };
      resolve(true);
    });
  }

}
