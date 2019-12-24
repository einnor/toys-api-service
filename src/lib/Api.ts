import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';
import { ResourceNotFoundException, UnauthorizedException, BadRequestException, ForbiddenException } from './exceptions';

export class Api {
  /**
   * Return a 401 status for requests that require authorization, but do not
   * contain a validation Auth Bearer token in the request headers.
   *
   * @param request
   * @param response
   */
  public static unauthorized(request: Request, response: Response): Response {
    response.statusCode = 401;
    return response.json();
  }

  /**
   * Return a 403 status for requests that attempt to do an action that is
   * forbidden
   *
   * @param request
   * @param response
   */
  public static forbidden(request: Request, response: Response): Response {
    response.statusCode = 403;
    return response.json();
  }

  /**
   * Return a 404 status when a the requested route is not defined, or the route
   * params refer to an Entity which does not exist.
   *
   * @param request
   * @param response
   * @param responseData
   * @param shouldAlert Whether the engineers should be notified about this 404 error
   */
  public static notFound(
    request: Request,
    response: Response,
    responseData?: string | object,
    shouldAlert: boolean = true
  ): Response {
    response.statusCode = 404;
    console.error(`404 Status:\n${responseData || 'no error data'}`);

    if (shouldAlert && responseData && responseData !== '') {
      try {
        // TODO Notify the engineers
      } catch (error) {
        console.log('Failed to notify the engineers about this 400 error', error);
      }
    }

    console.error('404 Status for ', request.url);

    return response.json();
  }

  /**
   * Return a 400 status when there is something wrong with the request, such
   * as an invalid query param or property in the request body.
   *
   * @param request
   * @param response
   * @param responseData
   * @param shouldAlert Whether the engineers should be notified about this 400 error
   */
  public static badRequest(
    request: Request,
    response: Response,
    responseData: string | object,
    shouldAlert: boolean = true
  ): Response {
    response.statusCode = 400;
    console.error(`400 Status:\n${responseData || 'no error data'}`);

    if (shouldAlert) {
      try {
        // TODO Notify the engineers
      } catch (error) {
        console.log('Failed to notify the engineers about this 400 error', error);
      }
    }

    if (typeof responseData === 'string') {
      return response.json({
        error: responseData,
      });
    } else {
      return response.json(responseData);
    }
  }

  /**
   * Return a deliberate 500 status when something bad happened in a route controller
   * that was not meant to happen, but was caught or accounted for.
   *
   * @param request
   * @param response
   * @param responseData
   */
  public static internalError(request: Request, response: Response, responseData?: string | object): Response {
    response = response.status(500);

    console.error('500 Status at: ', new Date(), `\n`, responseData || 'no error data');

    try {
      // TODO Notify the engineers
    } catch (error) {
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

  /**
   * Return a 200 status when the requested route resulted in a success.
   *
   * @param response
   * @param responseData
   */
  public static success(response: Response, responseData?: object): Response {
    response.statusCode = 200;

    return response.json(responseData);
  }

  /**
   * Return a 201 status when the requested routed resulted in the successful
   * creation of an Entity.
   *
   * @param response
   * @param responseData
   */
  public static successfullyAdded(response: Response, responseData?: object): Response {
    response.statusCode = 201;

    return response.json(responseData);
  }

  /**
   * Return a 500 status when something happens that was completely unhandled
   * or accounted for, such as an uncaught exception.
   *
   * @param error
   * @param request
   * @param response
   * @param next
   */
  public static handleUncaughtException(error: ApiError, request: Request, response: Response, next: NextFunction) {
    let errorMessage: any = error.toString();

    // Additional data to include in the response, if the error is a 400 Bad Request
    let data: string | object = errorMessage;

    if (error.responseStatus === 400 && error.data && typeof error.data === 'object' && !Array.isArray(error.data)) {
      data = Object.assign(error.data, {
        error: errorMessage,
      });
    }

    // The error may specify the intended HTTP response.
    // Is it marked as a 400 (bad request) or 404 (not found)?
    if (error.responseStatus === 400) {
      return Api.badRequest(request, response, data, error.shouldAlert);
    } else if (error.responseStatus === 404) {
      return Api.notFound(request, response, data, error.shouldAlert);
    }

    // Otherwise, return 500 (internal server error)
    return Api.internalError(request, response, errorMessage);
  }

  public static handleExceptions (request: Request, response: Response, error) {
    switch (error.constructor) {
      case ResourceNotFoundException:
        return Api.notFound(request, response, error);
      case BadRequestException:
        return Api.badRequest(request, response, error);
      case UnauthorizedException:
        return Api.unauthorized(request, response);
      case ForbiddenException:
        return Api.forbidden(request, response);
      default:
        return Api.internalError(request, response, error);
    }
  };
}
