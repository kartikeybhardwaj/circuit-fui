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
export class ProjectStorageService {

  projects: ProjectData[] = [];
  idMapProjects: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getProjects(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getProjects, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.projects = [];
            this.idMapProjects = response.data.idMap;
            response.data.projects.forEach(project => {
              const members: ProjectMemberData[] = [];
              project.members.forEach(member => {
                members.push({
                  userId: member.userId,
                  roleId: member.roleId
                });
              });
              const milestonesList: string[] = [];
              project.milestonesList.forEach(milestone => {
                milestonesList.push(milestone);
              });
              this.projects.push({
                projectId: project._id,
                index: project.index,
                title: project.title,
                description: project.description,
                visibility: project.visibility,
                visibilityIcon: this.appInfo.constants.buildingBlocks.icons[project.visibility],
                members,
                milestonesList,
                milestonesListCount: project.milestonesList.length,
                projectMetaId: project.projectMetaId,
                fields: project.fields,
                meta: {
                  addedBy: project.meta.addedBy,
                  addedOn: project.meta.addedOn,
                  lastUpdatedBy: project.meta.lastUpdatedBy ? project.meta.lastUpdatedBy : null,
                  lastUpdatedOn: project.meta.lastUpdatedOn ? project.meta.lastUpdatedOn : null
                }
              });
            });
            resolve(this.projects);
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
