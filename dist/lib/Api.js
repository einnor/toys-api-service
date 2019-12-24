"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
class Api {
    static unauthorized(request, response) {
        response.statusCode = 401;
        return response.json();
    }
    static forbidden(request, response) {
        response.statusCode = 403;
        return response.json();
    }
    static notFound(request, response, responseData, shouldAlert = true) {
        response.statusCode = 404;
        console.error(`404 Status:\n${responseData || 'no error data'}`);
        if (shouldAlert && responseData && responseData !== '') {
            try {
            }
            catch (error) {
                console.log('Failed to notify the engineers about this 400 error', error);
            }
        }
        console.error('404 Status for ', request.url);
        return response.json();
    }
    static badRequest(request, response, responseData, shouldAlert = true) {
        response.statusCode = 400;
        console.error(`400 Status:\n${responseData || 'no error data'}`);
        if (shouldAlert) {
            try {
            }
            catch (error) {
                console.log('Failed to notify the engineers about this 400 error', error);
            }
        }
        if (typeof responseData === 'string') {
            return response.json({
                error: responseData,
            });
        }
        else {
            return response.json(responseData);
        }
    }
    static internalError(request, response, responseData) {
        response = response.status(500);
        console.error('500 Status at: ', new Date(), `\n`, responseData || 'no error data');
        try {
        }
        catch (error) {
            console.log('Failed to notify the engineers about this 500 error', error);
        }
        if (process.env.NODE_ENV === 'production') {
            responseData = 'Internal Server Error';
        }
        if (typeof responseData === 'string') {
            return response.json({
                error: responseData,
            });
        }
        if (typeof responseData === 'object') {
            const messageOrError = responseData['message'] || responseData['error'];
            if (messageOrError) {
                return response.json({
                    error: messageOrError,
                });
            }
        }
        return response.json(responseData);
    }
    static success(response, responseData) {
        response.statusCode = 200;
        return response.json(responseData);
    }
    static successfullyAdded(response, responseData) {
        response.statusCode = 201;
        return response.json(responseData);
    }
    static handleUncaughtException(error, request, response, next) {
        let errorMessage = error.toString();
        let data = errorMessage;
        if (error.responseStatus === 400 && error.data && typeof error.data === 'object' && !Array.isArray(error.data)) {
            data = Object.assign(error.data, {
                error: errorMessage,
            });
        }
        if (error.responseStatus === 400) {
            return Api.badRequest(request, response, data, error.shouldAlert);
        }
        else if (error.responseStatus === 404) {
            return Api.notFound(request, response, data, error.shouldAlert);
        }
        return Api.internalError(request, response, errorMessage);
    }
    static handleExceptions(request, response, error) {
        switch (error.constructor) {
            case exceptions_1.ResourceNotFoundException:
                return Api.notFound(request, response, error);
            case exceptions_1.BadRequestException:
                return Api.badRequest(request, response, error);
            case exceptions_1.UnauthorizedException:
                return Api.unauthorized(request, response);
            default:
                return Api.internalError(request, response, error);
        }
    }
    ;
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map