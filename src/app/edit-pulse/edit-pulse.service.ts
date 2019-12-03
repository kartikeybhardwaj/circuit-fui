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
  PulseStorageService
} from '../pulses/pulses.service';
import {
  MetaPulsesStorageService
} from '../meta-pulses/meta-pulses.service';
import {
  GetUsersAvailabilityCreatingPulsePayloadValidator
} from '../json-schema-validatior/get-users-availability-creating-pulse';
import {
  UpdatePulsePayloadValidator
} from '../json-schema-validatior/update-pulse';

@Injectable()
export class EditPulseStorageService {

  pulse: EditPulseData = {
    pulseId: '',
    milestoneId: '',
    projectId: '',
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    color: 'blue',
    assignees: [],
    assigneesTodo: {
      toAdd: [],
      toRemove: []
    },
    pulseMetaId: null,
    fields: []
  };
  selectedPulseMeta: any = null;
  timeline = null;
  initialAssignees: string[] = [];

  constructor(
    private appInfo: AppStorageService,
    private pulseInfo: PulseStorageService,
    private metaPulseInfo: MetaPulsesStorageService,
    private checkUsersAvailabilityPayloadValidator: GetUsersAvailabilityCreatingPulsePayloadValidator,
    private updatePulsePayloadValidator: UpdatePulsePayloadValidator,
    private http: HttpClient
  ) {}

  validateRequestCheckAvailability(usersAvailability: CheckUsersAvailabilityData): [boolean, string] {
    return this.checkUsersAvailabilityPayloadValidator.validateSchema(usersAvailability);
  }

  getPulse(projectId: string, milestoneId: string, pulseId: string): any {
    return new Promise((resolve, reject) => {
      const httpOptions = this.appInfo.httpOptionsWithAuth;
      httpOptions.params = {
        projectId,
        milestoneId,
        pulseId
      };
      this.http.get(this.appInfo.constants.urls.getPulse, httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.pulse = {
              pulseId,
              milestoneId,
              projectId,
              title: response.data.pulse.title,
              description: response.data.pulse.description,
              timeline: {
                begin: new Date(response.data.pulse.timeline.begin).toISOString(),
                end: new Date(response.data.pulse.timeline.end).toISOString()
              },
              color: response.data.pulse.color,
              assignees: response.data.pulse.assignees,
              assigneesTodo: {
                toAdd: [],
                toRemove: []
              },
              pulseMetaId: response.data.pulse.pulseMetaId,
              fields: response.data.pulse.fields
            };
            this.metaPulseInfo.metaPulses.some((metaPulse) => {
              if (metaPulse.metaPulseId === response.data.pulse.pulseMetaId) {
                this.selectedPulseMeta = metaPulse;
                return true;
              }
            });
            this.initialAssignees = response.data.pulse.assignees;
            this.timeline = {
              begin: new Date(response.data.pulse.timeline.begin),
              end: new Date(response.data.pulse.timeline.end)
            };
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

  getUsersAvailability(reqPayload: CheckUsersAvailabilityData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.getOverlapsCreatingPulse,
        JSON.stringify(reqPayload),
        this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, '', response.data]);
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

  validateRequestUpdatePulse(pulse: EditPulseData): [boolean, string] {
    return this.updatePulsePayloadValidator.validateSchema(pulse);
  }

  updatePulse(reqPayload: EditPulseData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.updatePulse, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, 'Pulse updated', response.data]);
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
