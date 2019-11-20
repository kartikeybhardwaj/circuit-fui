import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class GetUsersAvailabilityCreatingPulsePayloadValidator {

  schema = {
    type: 'object',
    properties: {
      milestoneId: {
        type: 'string',
        pattern: '^[0-9a-z]*$',
        minLength: 24,
        maxLength: 24
      },
      timeline: {
        type: 'object',
        properties: {
          begin: {
            type: 'string',
            pattern: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z'
          },
          end: {
            type: 'string',
            pattern: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z'
          }
        },
        required: [
          'begin',
          'end'
        ],
        additionalProperties: false
      },
      members: {
          type: 'array',
          items: {
            type: 'string',
            pattern: '^[0-9a-z]*$',
            minLength: 24,
            maxLength: 24
        },
        minItems: 1,
        maxItems: 20,
        uniqueItems: true
      }
    },
    required: [
      'milestoneId',
      'timeline',
      'members'
    ],
    additionalProperties: false
  };

  constructor() {}

  getUserlikeErrorMessage(error): string {
    let message = '';
    if (error.dataPath.startsWith('.timeline')) {
      message = 'Invalid timeline';
    } else if (error.dataPath === '.members') {
      message = 'Assignees should not be empty';
    }
    return message;
  }

  validateSchema(usersAvailability: CheckUsersAvailabilityData): [boolean, string] {
    let success = false;
    let message = '';
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);
    const valid = validate(usersAvailability);
    if (!valid) {
      message = this.getUserlikeErrorMessage(validate.errors[0]);
    } else {
      success = true;
    }
    return [success, message];
  }

}
