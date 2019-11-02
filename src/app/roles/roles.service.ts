import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';

@Injectable()
export class RoleStorageService {

  roles: RoleData[] = [];
  idMapRoles: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getRoles(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getRoles, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.roles = [];
            this.idMapRoles = response.data.idMap;
            response.data.roles.forEach(role => {
              this.roles.push({
                roleId: role._id.$oid,
                index: role.index,
                title: role.title,
                description: role.description,
                canModifyUsersRole: role.canModifyUsersRole,
                canModifyLocations: role.canModifyLocations,
                canModifyProjects: role.canModifyProjects,
                canModifyMilestones: role.canModifyMilestones,
                canModifyPulses: role.canModifyPulses,
                meta: {
                  addedBy: role.meta.addedBy ? role.meta.addedBy.$oid : null,
                  addedOn: role.meta.addedOn ? this.appInfo.getLongDate(role.meta.addedOn.$date) : null,
                  lastUpdatedBy: role.meta.lastUpdatedBy ? role.meta.lastUpdatedBy.$oid : null,
                  lastUpdatedOn: role.meta.lastUpdatedOn ? this.appInfo.getLongDate(role.meta.lastUpdatedOn.$date) : null
                }
              });
            });
            resolve(this.roles);
          } else {
            if (response.message) {
              reject(response.message);
            } else {
              reject(this.appInfo.constants.messages.someErrorOccurred);
            }
          }
        },
        (error: any) => {
          reject(error);
        });
    });
  }

}
