import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'express';
import redis from 'redis';
import { Api } from '../lib/Api';

const REDIS_PORT = process.env.REDIS_PORT || '6379';
const REDIS_EXPIRATION = 60;

// configure redis client on port 6379
const redisClient = redis.createClient(REDIS_PORT);

/**
 * Middleware Function to Redis Check Cache
 *
 * @param request
 * @param response
 * @param next
 */

export function checkCache (request: Request, response: Response, next: NextFunction) {
  const key = request.originalUrl;

  redisClient.get(key, (error, data) => {
    if (error) {
      console.log(error);
      return Api.internalError(request, response, error);
    }

    if (data) {
      return Api.success(response, JSON.parse(data));
    }

    // Proceed to the next middleware function
    return next();
  });
};

export function addToCache (key: string, data: object) {
  redisClient.setex(key, REDIS_EXPIRATION, JSON.stringify(data));
}
