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
import {
  UpdateProjectPayloadValidator
} from '../json-schema-validatior/update-project';

@Injectable()
export class EditProjectStorageService {

  project: EditProjectData = {
    projectId: '',
    title: '',
    description: '',
    visibility: 'internal',
    members: [],
    membersTodo: {
      toAdd: [],
      toRemove: []
    },
    projectMetaId: null,
    fields: []
  };
  selectedProjectMeta: any = null;
  initialMembers: string[] = [];

  constructor(
    private appInfo: AppStorageService,
    private projectInfo: ProjectStorageService,
    private metaProjectInfo: MetaProjectsStorageService,
    private updateProjectPayloadValidator: UpdateProjectPayloadValidator,
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
              projectId,
              title: response.data.project.title,
              description: response.data.project.description,
              visibility: response.data.project.visibility,
              members: [],
              membersTodo: {
                toAdd: [],
                toRemove: []
              },
              projectMetaId: response.data.project.projectMetaId,
              fields: response.data.project.fields
            };
            this.initialMembers = [];
            response.data.project.members.forEach((member) => {
              this.initialMembers.push(this.projectInfo.idMapProjects[member.userId]);
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

  validateRequestUpdateProject(project: EditProjectData): [boolean, string] {
    return this.updateProjectPayloadValidator.validateSchema(project);
  }

  updateProject(reqPayload: EditProjectData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.updateProject, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, 'Project updated', response.data]);
          } else if (response.message) {
            reject([false, response.message, {}]);
          } else {
            reject([false, this.appInfo.constants.messages.someErrorOccurred, {}]);
          }
        },
        (error: any) => {
          reject([false, this.appInfo.constants.messages.someErrorOccurred, {}]);
        });
    });
  }

}
