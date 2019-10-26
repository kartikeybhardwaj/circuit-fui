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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  today: string;

  constructor(
    public appInfo: AppStorageService,
    public headerInfo: HeaderStorageService
  ) {
    this.today = appInfo.getShortDate(new Date().getTime());
  }

  ngOnInit() {}

}
