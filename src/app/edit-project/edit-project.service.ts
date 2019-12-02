import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  MetaProjectsStorageService
} from '../meta-projects/meta-projects.service';
import {
  ProjectStorageService
} from '../projects/projects.service';

@Injectable()
export class EditProjectStorageService {

  project: AddProjectData = {
    title: '',
    description: '',
    visibility: 'internal',
    members: [],
    projectMetaId: null,
    fields: []
  };
  selectedProjectMeta: any = null;

  constructor(
    private appInfo: AppStorageService,
    private projectInfo: ProjectStorageService,
    private metaProjectInfo: MetaProjectsStorageService,
    private http: HttpClient
  ) {}

  getProject(projectId: string): any {
    return new Promise((resolve, reject) => {
      const httpOptions = this.appInfo.httpOptionsWithAuth;
      httpOptions.params = {
        projectId
      };
      this.http.get(this.appInfo.constants.urls.getProject, httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.project = {
              title: response.data.project.title,
              description: response.data.project.description,
              visibility: response.data.project.visibility,
              members: [],
              projectMetaId: response.data.project.projectMetaId,
              fields: response.data.project.fields
            };
            response.data.project.members.forEach((member) => {
              this.project.members.push({
                username: this.projectInfo.idMapProjects[member.userId],
                displayname: this.projectInfo.idMapProjects[member.userId],
                roleId: member.roleId
              });
            });
            this.metaProjectInfo.metaProjects.some((metaProject) => {
              if (metaProject.metaProjectId === response.data.project.projectMetaId) {
                this.selectedProjectMeta = metaProject;
                return true;
              }
            });
            resolve(response.data);
          } else {
            if (response.message) {
              reject(response.message);
            } else {
              reject(this.appInfo.constants.messages.someErrorOccurred);
            }
          }
        },
        (error: any) => {
          reject(this.appInfo.constants.messages.someErrorOccurred);
        });
    });
  }

}
