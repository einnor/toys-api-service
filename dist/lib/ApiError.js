"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, data, responseStatus = 500, shouldAlert = true) {
        super(message);
        this.responseStatus = 500;
        this.data = data;
        this.name = this.constructor.name;
        this.responseStatus = responseStatus;
        this.shouldAlert = shouldAlert;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = new Error(message).stack;
        }
    }
    toString() {
        return this.message;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map