import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class UpdateMilestonePayloadValidator {

  schema = {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
        pattern: '^[0-9a-z]*$',
        minLength: 24,
        maxLength: 24
      },
      milestoneId: {
        type: 'string',
        pattern: '^[0-9a-z]*$',
        minLength: 24,
        maxLength: 24
      },
      title: {
        type: 'string',
        pattern: '^[0-9a-zA-Z\\-\\ ]*$',
        minLength: 2,
        maxLength: 200
      },
      description: {
        type: 'string',
        minLength: 4,
        maxLength: 400
      },
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
      },
      milestoneMetaId: {
        type: [
          'string',
          'null'
        ],
        pattern: '^[0-9a-z]*$',
        minLength: 24,
        maxLength: 24
      },
      fields: {
        type: 'array',
        minItems: 0,
        uniqueItems: true,
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              minLength: 1
            },
            value: {
              type: 'string',
              minLength: 1
            }
          },
          required: [
            'key',
            'value'
          ],
          additionalProperties: false
        }
      }
    },
    required: [
      'projectId',
      'milestoneId',
      'title',
      'description',
      'locationId',
      'timeline',
      'milestoneMetaId',
      'fields'
    ],
    additionalProperties: false
  };

  constructor() {}

  getUserlikeErrorMessage(error): string {
    let message = '';
    if (error.dataPath === '.title') {
      message = 'Title ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 2 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 200 characters';
      } else if (error.keyword === 'pattern') {
        message += 'should not have special characters';
      }
    } else if (error.dataPath === '.description') {
      message = 'Description ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 4 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 400 characters';
      }
    } else if (error.dataPath.startsWith('.locationId')) {
      message = 'Invalid location';
    } else if (error.dataPath.startsWith('.timeline')) {
      message = 'Invalid timeline';
    } else if (error.dataPath.startsWith('.fields') && error.dataPath.endsWith('.value')) {
      message = 'Meta values should not be empty';
    }
    return message;
  }

  validateSchema(milestone: EditMilestoneData): [boolean, string] {
    let success = false;
    let message = '';
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);
    const valid = validate(milestone);
    if (!valid) {
      message = this.getUserlikeErrorMessage(validate.errors[0]);
    } else {
      success = true;
    }
    return [success, message];
  }

}
