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
export class MetaProjectsStorageService {

  metaProjects: MetaProjectData[] = [];
  idMapMetaProjects: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getMetaProjects(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getMetaProjects, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.metaProjects = [];
            this.idMapMetaProjects = response.data.idMap;
            response.data.metaProjects.forEach(metaProject => {
              this.metaProjects.push({
                metaProjectId: metaProject._id,
                index: metaProject.index,
                title: metaProject.title,
                description: metaProject.description,
                fields: metaProject.fields,
                meta: {
                  addedBy: metaProject.meta.addedBy ? metaProject.meta.addedBy : null,
                  addedOn: metaProject.meta.addedOn ? metaProject.meta.addedOn : null,
                  lastUpdatedBy: metaProject.meta.lastUpdatedBy ? metaProject.meta.lastUpdatedBy : null,
                  lastUpdatedOn: metaProject.meta.lastUpdatedOn ? metaProject.meta.lastUpdatedOn : null
                }
              });
            });
            resolve(this.metaProjects);
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
