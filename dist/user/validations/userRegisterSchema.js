"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRegisterSchema = void 0;
exports.validateUserRegisterSchema = {
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
