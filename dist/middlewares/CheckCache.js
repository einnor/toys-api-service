"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const Api_1 = require("../lib/Api");
const REDIS_PORT = process.env.REDIS_PORT || '6379';
const REDIS_EXPIRATION = 60;
const redisClient = redis_1.default.createClient(REDIS_PORT);
function checkCache(request, response, next) {
    const key = request.originalUrl;
    redisClient.get(key, (error, data) => {
        if (error) {
            console.log(error);
            return Api_1.Api.internalError(request, response, error);
        }
        if (data) {
            return Api_1.Api.success(response, JSON.parse(data));
        }
        return next();
    });
}
exports.checkCache = checkCache;
;
function addToCache(key, data) {
    redisClient.setex(key, REDIS_EXPIRATION, JSON.stringify(data));
}
exports.addToCache = addToCache;
//# sourceMappingURL=CheckCache.js.map