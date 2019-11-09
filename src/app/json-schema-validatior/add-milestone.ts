import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class AddMilestonePayloadValidator {

  schema = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        pattern: '^[0-9a-zA-Z\\-\\ ]*$',
        minLength: 4,
        maxLength: 20
      },
      description: {
        type: 'string',
        minLength: 4,
        maxLength: 40
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
      },
      linkedProjectId: {
        type: 'string',
        pattern: '^[0-9a-z]*$',
        minLength: 24,
        maxLength: 24
      }
    },
    required: [
      'title',
      'description',
      'timeline',
      'milestoneMetaId',
      'fields',
      'linkedProjectId'
    ],
    additionalProperties: false
  };

  constructor() {}

  getUserlikeErrorMessage(error): string {
    let message = '';
    if (error.dataPath === '.title') {
      message = 'Title ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 4 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 20 characters';
      } else if (error.keyword === 'pattern') {
        message += 'should not have special characters';
      }
    } else if (error.dataPath === '.description') {
      message = 'Description ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 4 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 40 characters';
      }
    } else if (error.dataPath.startsWith('.timeline')) {
      message = 'Invalid timeline';
    } else if (error.dataPath.startsWith('.fields') && error.dataPath.endsWith('.value')) {
      message = 'Meta values should not be empty';
    }
    return message;
  }

  validateSchema(milestone: AddMilestoneData): [boolean, string] {
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
