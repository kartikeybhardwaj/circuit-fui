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
