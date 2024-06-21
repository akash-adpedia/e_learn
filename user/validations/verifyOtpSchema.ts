import { JSONSchemaType } from 'ajv';
import { IOtpBody } from '../../types/userTypes';

export const validateVerifyOtpSchema: JSONSchemaType<IOtpBody> = {
  type: 'object',
  properties: {
    mobileNumber: { type: 'number' },
    otp: { type: 'string' },
    deviceId: { type: 'string' },
    deviceType: { type: 'string', enum:[ 'web', 'mobile' ] },
  },
  required: [ 'mobileNumber', 'otp', 'deviceId', 'deviceType' ],
  additionalProperties: false,
};
