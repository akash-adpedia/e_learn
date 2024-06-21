"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerifyOtpSchema = void 0;
exports.validateVerifyOtpSchema = {
    type: 'object',
    properties: {
        mobileNumber: { type: 'number' },
        otp: { type: 'string' },
        deviceId: { type: 'string' },
        deviceType: { type: 'string', enum: ['web', 'mobile'] },
    },
    required: ['mobileNumber', 'otp', 'deviceId', 'deviceType'],
    additionalProperties: false,
};
