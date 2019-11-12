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
import {
  RoleStorageService
} from './roles/roles.service';
import {
  MetaProjectsStorageService
} from './meta-projects/meta-projects.service';
import {
  MetaMilestonesStorageService
} from './meta-milestones/meta-milestones.service';
import {
  MetaPulsesStorageService
} from './meta-pulses/meta-pulses.service';
import {
  LocationStorageService
} from './locations/locations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSiteLoading = true;

  constructor(
    public appInfo: AppStorageService,
    private projectInfo: ProjectStorageService,
    private roleInfo: RoleStorageService,
    private metaProjectInfo: MetaProjectsStorageService,
    private metaMilestoneInfo: MetaMilestonesStorageService,
    private metaPulseInfo: MetaPulsesStorageService,
    private locationInfo: LocationStorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getConstants().then((constants) => {
      this.getUser().then((user) => {
        this.roleInfo.getRoles().then((roles) => {
          this.projectInfo.getProjects().then((projects) => {
            this.locationInfo.getLocations().then((locations) => {
              this.isSiteLoading = false;
              this.metaProjectInfo.getMetaProjects();
              this.metaMilestoneInfo.getMetaMilestones();
              this.metaPulseInfo.getMetaPulses();
            }).catch((error) => {
              this.isSiteLoading = false;
              this.appInfo.user = null;
            });
          }).catch((error) => {
            this.isSiteLoading = false;
            this.appInfo.user = null;
          });
        }).catch((error) => {
          this.isSiteLoading = false;
          this.appInfo.user = null;
        });
      }).catch((error) => {
        this.isSiteLoading = false;
        this.appInfo.user = null;
      });
    }).catch((error) => {
      this.isSiteLoading = false;
      this.appInfo.user = null;
    });
  }

  getConstants() {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.fetchConstantsURI, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          this.appInfo.constants = response;
          resolve(true);
        },
        (error: any) => {
          reject(false);
        }
      );
    });
  }

  getUser(): any {
    // get user data and set to appInfo.user
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getUser, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          this.appInfo.user = response.data;
          resolve(true);
        },
        (error: any) => {
          reject(false);
        }
      );
    });
  }

}
