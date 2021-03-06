import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class AddMetaMilestonePayloadValidator {

  schema = {
    type: 'object',
    properties: {
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
      fields: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              pattern: '^[0-9a-zA-Z\\-\\ ]*$',
              minLength: 2,
              maxLength: 200
            },
            valueType: {
              type: 'string',
              enum: [
                'input',
                'select'
              ]
            },
            value: {
              anyOf: [{
                type: 'string',
                pattern: '^[0-9a-zA-Z\\-\\ ]*$',
                minLength: 0,
                maxLength: 200
              }, {
                type: 'array',
                items: {
                  type: 'string',
                  pattern: '^[0-9a-zA-Z\\-\\ ]*$',
                  minLength: 1,
                  maxLength: 200
                },
                minItems: 1,
                maxItems: 20,
                uniqueItems: true
              }]
            }
          },
          required: [
            'key',
            'valueType',
            'value'
          ],
          additionalProperties: false
        },
        minItems: 1,
        maxItems: 10,
        uniqueItems: true
      }
    },
    required: [
      'title',
      'description',
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
    } else if (error.dataPath.startsWith('.fields') && error.dataPath.endsWith('.key')) {
      message = 'Keys ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 2 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 200 characters';
      } else if (error.keyword === 'pattern') {
        message += 'should not have special characters';
      }
    } else if (error.dataPath.startsWith('.fields') && error.dataPath.endsWith('.value')) {
      message = 'Key values ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 1 character';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 200 characters';
      } else if (error.keyword === 'pattern') {
        message += 'should not have special characters';
      } else if (error.keyword === 'minItems') {
        message += 'should not be less than 1 item';
      } else if (error.keyword === 'maxItems') {
        message += 'should not be more than 20 items';
      } else if (error.keyword === 'uniqueItems') {
        message += 'should not have repeated items';
      } else {
        message = 'Invalid key values';
      }
    } else if (error.dataPath.startsWith('.fields')) {
      message = 'Fields ';
      if (error.keyword === 'minItems') {
        message += 'should not be less than 1 item';
      } else if (error.keyword === 'maxItems') {
        message += 'should not be more than 10 items';
      } else if (error.keyword === 'uniqueItems') {
        message += 'should not have repeated items';
      }
    }
    return message;
  }

  validateSchema(metaMilestone: AddMetaMilestoneData): [boolean, string] {
    let success = false;
    let message = '';
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);
    const valid = validate(metaMilestone);
    if (!valid) {
      message = this.getUserlikeErrorMessage(validate.errors[0]);
    } else {
      success = true;
    }
    return [success, message];
  }

}
