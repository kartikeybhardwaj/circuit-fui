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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getConstants().then((response) => {
      this.getUser();
    });
    this.getUser();
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

  getUser(): void {
    // get user data and set to appInfo.user
    this.appInfo.user = {
      username: 'kartoon',
      displayname: 'kartoon'
    };
  }

}
