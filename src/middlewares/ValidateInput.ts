import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import { NextFunction } from 'express';
import { Api } from '../lib/Api';

/**
 * Middleware which validates the route params, query string, and request
 * body. Validations are based on the `validate` property of the `Route`
 * definition. If `validate` is not set, no validations will be performed.
 *
 * The array of validations specified in the `validate` should be an array
 * of `express-validator` methods.
 *
 * @param request
 * @param response
 * @param next
 */
export function checkValidationResult(request: Request, response: Response, next: NextFunction) {
  const errors = validationResult(request);

  // Any input validation errors?
  // Send a Bad Request status.
  if (!errors.isEmpty()) {
    return Api.badRequest(request, response, errors.mapped());
  }

  // No errors? Proceed...
  return next();
}
