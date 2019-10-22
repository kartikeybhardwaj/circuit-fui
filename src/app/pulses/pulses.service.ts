import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Injectable()
export class PulseStorageService {

  constructor(
    private appInfo: AppStorageService
  ) {}

  getPulses(): any {
    return new Promise((resolve, reject) => {
      this.appInfo.pulses = [{
        index: 1,
        _id: '1234567890',
        title: 'this is some title',
        description: 'this is some description',
        timeline: {
          begin: this.appInfo.getShortDate(new Date().getTime()),
          end: this.appInfo.getShortDate(new Date().getTime())
        },
        assigneesList: [{
          _id: '1234567890',
          name: 'some username'
        }, {
          _id: '1234567890',
          name: 'another username'
        }],
        assigneesListCount: 2,
        comments: [],
        pulseMetaId: 'string',
        fields: [{
          key: 'key_1',
          key_1: 'value_1'
        }, {
          key: 'key_2',
          key_2: 'value_2'
        }, {
          key: 'key_3',
          key_3: 'value_3'
        }],
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 2,
        _id: '1234567890',
        title: 'this is some random title',
        description: 'this is some description',
        timeline: {
          begin: this.appInfo.getShortDate(new Date().getTime()),
          end: this.appInfo.getShortDate(new Date().getTime())
        },
        assigneesList: [{
          _id: '1234567890',
          name: 'some username'
        }, {
          _id: '1234567890',
          name: 'another username'
        }],
        assigneesListCount: 2,
        comments: [],
        pulseMetaId: 'string',
        fields: [{
          key: 'key_1',
          key_1: 'value_1'
        }, {
          key: 'key_2',
          key_2: 'value_2'
        }, {
          key: 'key_3',
          key_3: 'value_3'
        }],
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }];
      resolve(true);
    });
  }

}
