import { JSONSchemaType } from 'ajv';
import { IUserBody } from '../../types/userTypes';

export const validateUserRegisterSchema: JSONSchemaType<IUserBody> = {
  type: 'object',
  properties: {
    userName: { type: 'string', minLength: 1 },
    userType: { type: 'string', enum: ['adult', 'child', 'teenager'] },
    mobileNumber: { type: 'number' },
    dob: { type: 'string' },
    email: { type: 'string', nullable: true },
    parentName: { type: 'string', nullable: true },
    parentDob: { type: 'string', nullable: true },
    gender: { type: 'string', enum: ['male', 'female'] },
  },
  required: ['userName', 'userType', 'mobileNumber', 'dob', 'gender'],
  additionalProperties: false,
};
