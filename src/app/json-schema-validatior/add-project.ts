import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class AddProjectPayloadValidator {

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
      visibility: {
        type: 'string',
        enum: [
          'public',
          'internal',
          'private'
        ]
      },
      members: {
        type: 'array',
        minItems: 0,
        uniqueItems: true,
        items: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              pattern: '^[0-9a-zA-Z\\.\\_]*$',
              minLength: 4
            },
            displayname: {
              type: 'string',
              minLength: 0
            },
            roleId: {
              type: 'string',
              pattern: '^[0-9a-z]*$',
              minLength: 24,
              maxLength: 24
            }
          },
          required: [
            'username',
            'displayname',
            'roleId'
          ],
          additionalProperties: false
        }
      },
      projectMetaId: {
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
              title: 'Key',
              type: 'string',
              minLength: 1
            },
            value: {
              title: 'Value',
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
      'title',
      'description',
      'visibility',
      'members',
      'projectMetaId',
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
    } else if (error.dataPath.startsWith('.members') && error.dataPath.endsWith('.username')) {
      message = 'Members name ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 4 characters';
      } else if (error.keyword === 'pattern') {
        message += 'should not have special characters';
      }
    } else if (error.dataPath.startsWith('.members') && error.dataPath.endsWith('.roleId')) {
      message = 'Members role should not be empty';
    } else if (error.dataPath.startsWith('.fields') && error.dataPath.endsWith('.value')) {
      message = 'Meta values should not be empty';
    }
    return message;
  }

  validateSchema(project: AddProjectData): [boolean, string] {
    let success = false;
    let message = '';
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);
    const valid = validate(project);
    if (!valid) {
      message = this.getUserlikeErrorMessage(validate.errors[0]);
    } else {
      success = true;
    }
    return [success, message];
  }

}
