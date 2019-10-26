import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Injectable()
export class HeaderStorageService {

  isWorking = false;

  constructor(
    public appInfo: AppStorageService
  ) {}

}
