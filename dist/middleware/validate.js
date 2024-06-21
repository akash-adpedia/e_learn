"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validateQuery = void 0;
const ajv_1 = __importDefault(require("ajv"));
const appError_1 = __importDefault(require("../common/appError"));
const httpStatus_1 = require("../common/httpStatus");
const ajv = new ajv_1.default();
const validateQuery = (schema) => {
    return (req, res, next) => {
        const validate = ajv.compile(schema);
        const valid = validate(req.query);
        if (!valid) {
            let errorMessage = 'Invalid query parameters';
            if (validate.errors && validate.errors.length > 0) {
                errorMessage = validate.errors[0].message || errorMessage;
            }
            throw new appError_1.default(errorMessage, httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
        }
        next();
    };
};
exports.validateQuery = validateQuery;
const validateBody = (schema) => {
    return (req, res, next) => {
        const validate = ajv.compile(schema);
        const valid = validate(req.body);
        if (!valid) {
            let errorMessage = 'Invalid request body';
            if (validate.errors && validate.errors.length > 0) {
                const error = validate.errors[0];
                const { instancePath, message } = error;
                const fieldName = instancePath.substring(1);
                errorMessage = `${fieldName} ${message}` || errorMessage;
            }
            throw new appError_1.default(errorMessage, httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
        }
        next();
    };
};
exports.validateBody = validateBody;
