"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Api_1 = require("../lib/Api");
function checkValidationResult(request, response, next) {
    const errors = express_validator_1.validationResult(request);
    if (!errors.isEmpty()) {
        return Api_1.Api.badRequest(request, response, errors.mapped());
    }
    return next();
}
exports.checkValidationResult = checkValidationResult;
//# sourceMappingURL=ValidateInput.js.map