import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class AddTravelPayloadValidator {

  schema = {
    type: 'object',
    properties: {
      locationId: {
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
      }
    },
    required: [
      'locationId',
      'timeline'
    ],
    additionalProperties: false
  };

  constructor() {}

  getUserlikeErrorMessage(error): string {
    let message = '';
    if (error.dataPath === '.locationId') {
      message = 'Location should not be empty';
    } else if (error.dataPath.startsWith('.timeline')) {
      message = 'Invalid timeline';
    }
    return message;
  }

  validateSchema(travel: AddTravelData): [boolean, string] {
    let success = false;
    let message = '';
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);
    const valid = validate(travel);
    if (!valid) {
      message = this.getUserlikeErrorMessage(validate.errors[0]);
    } else {
      success = true;
    }
    return [success, message];
  }

}
