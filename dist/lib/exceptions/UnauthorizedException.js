"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class UnauthorizedException extends HttpException_1.default {
    constructor() {
        super(401, 'Authorization failed');
    }
}
exports.default = UnauthorizedException;
//# sourceMappingURL=UnauthorizedException.js.map