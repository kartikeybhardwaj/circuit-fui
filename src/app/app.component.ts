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
  HttpClient,
  HttpHeaders
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

import {
  AuthService
} from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import {
  SocialUser
} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSiteLoading = true;

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private authService: AuthService,
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
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.appInfo.httpOptionsWithAuth = {
          withCredentials: true,
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.user.idToken
          })
        };
        this.loadData();
      }
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

  loadData(): void {
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  getUser(): any {
    // const localStorageCircuitToken = this.appInfo.localStorage.getItem('circuitToken');
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getUser, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.data && response.data.username) {
            this.appInfo.localStorage.removeItem('circuitToken');
            this.appInfo.localStorage.setItem('circuitToken', 'Bearer ' + response.data.token);
            this.appInfo.user = response.data;
            this.appInfo.httpOptionsWithAuth = {
              withCredentials: true,
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + response.data.token
              })
            };
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error: any) => {
          reject(false);
        }
      );
    });
  }

}
