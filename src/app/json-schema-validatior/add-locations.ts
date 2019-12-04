import {
  Injectable
} from '@angular/core';

declare var Ajv: any;

@Injectable()
export class AddLocationsPayloadValidator {

  schema = {
    type: 'object',
    properties: {
      names: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              pattern: '^[0-9a-zA-Z\-\.\ ]*$',
              minLength: 2,
              maxLength: 200
            },
            country: {
              type: 'string',
              pattern: '^[0-9a-zA-Z\-\.\ ]*$',
              minLength: 2,
              maxLength: 200
            }
          },
          required: [
            'city',
            'country'
          ],
          additionalProperties: false
        },
        minItems: 1,
        maxItems: 20,
        uniqueItems: true
      }
    },
    required: [
      'names'
    ],
    additionalProperties: false
  };

  constructor() {}

  getUserlikeErrorMessage(error): string {
    let message = '';
    if (error.dataPath === '.city') {
      message = 'City ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 2 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 200 characters';
      }
    } else if (error.dataPath === '.country') {
      message = 'Country ';
      if (error.keyword === 'minLength') {
        message += 'should not be shorter than 2 characters';
      } else if (error.keyword === 'maxLength') {
        message += 'should not be greater than 200 characters';
      }
    }
    return message;
  }

  validateSchema(locations: AddLocationsData): [boolean, string] {
    let success = false;
    let message = '';
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);
    const valid = validate(locations);
    if (!valid) {
      message = this.getUserlikeErrorMessage(validate.errors[0]);
    } else {
      success = true;
    }
    return [success, message];
  }

}
