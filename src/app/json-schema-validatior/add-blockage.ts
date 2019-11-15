import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class AddBlockagePayloadValidator {

  schema = {
    type: 'object',
    properties: {
      reason: {
        type: 'string',
        pattern: '^[0-9a-zA-Z\\-\\ ]*$',
        minLength: 2,
        maxLength: 400
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
      'reason',
      'timeline'
    ],
    additionalProperties: false
  };

  constructor() {}

  getUserlikeErrorMessage(error): string {
    let message = '';
    if (error.dataPath === '.reason') {
      message = 'Reason ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 2 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 400 characters';
      }
    } else if (error.dataPath.startsWith('.timeline')) {
      message = 'Invalid timeline';
    }
    return message;
  }

  validateSchema(blockage: AddNonAvailabilityData): [boolean, string] {
    let success = false;
    let message = '';
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);
    const valid = validate(blockage);
    if (!valid) {
      message = this.getUserlikeErrorMessage(validate.errors[0]);
    } else {
      success = true;
    }
    return [success, message];
  }

}
