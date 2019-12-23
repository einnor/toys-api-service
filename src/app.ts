import express, { RequestHandler } from 'express';
import { createConnection } from 'typeorm';
import consoleStamp from 'console-stamp';
import cors from 'cors';
import helmet from 'helmet';
import 'reflect-metadata';

import { checkCache } from './middlewares/CheckCache';
import { checkValidationResult } from './middlewares/ValidateInput';
import { parseRequest } from './middlewares/ParseRequest';
import { Response, Request, NextFunction } from './@types/api';
import { Routes } from './routes';
import { Api } from './lib/Api';

// Make sure the node logs entries that have timestamps
consoleStamp(console, {
  pattern: 'mm/dd/yyyy HH:MM:ss.l',
});

const devResponseLogger = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'development') {
    return next();
  }

  console.log(
    `\n\nRESPONSE:\n\n${req.method} ${req.path} \
    \n  params: ${JSON.stringify(req.params)} \
    \n  query: ${JSON.stringify(req.query)} \
    \n  body: ${JSON.stringify(req.body)} \
    \n-> \
    \n${res.statusCode} ${res.statusMessage}`
  );
  next();
};

// Set logging options for the database
const loggingOptions: ('error' | 'warn' | 'schema' | 'query' | 'info' | 'log' | 'migration')[] = [
  'error',
  'warn',
  'schema',
];

// If we're not on production, log individual queries
if (process.env.NODE_ENV !== 'production') {
  loggingOptions.push('query');
}

// Establish the database connections,
// then initialize the API...
export const app = async () =>
  createConnection()
    .then((connection) => {
      // Create a new express application instance
      const router: express.Application = express();

      // The port the express app will listen on
      const port: number = parseInt(process.env.PORT || '8080');

      // Configure the JSON parser
      router.use(express.json({ limit: '1mb' }));

      // Configure CORS
      router.use(cors());

      // Configure response headers
      router.use(helmet());

      // Register all application routes
      Routes.forEach((route) => {
        // First and foremost, if this route has caching
        // enabled, add the Redis route cache middleware.
        // This is first in the middleware chain, as it
        // will bypass any further, unnecessary logic.
        if (route.cache === true) {
          router[route.method](route.path, checkCache);
        }

        // See if there's additional info the AppRoute
        // definition (such as which entity fields can be
        // used to sort results)
        router[route.method](route.path, (request: Request, response: Response, next: NextFunction) => {
          request.sortableFields = route.sortable || [];
          next();
        });

        // Then setup the request parser, which validates
        // and stores things like sort field/order.
        router[route.method](route.path, parseRequest as RequestHandler);

        // Apply input validation middleware, if set
        if (route.validate) {
          router[route.method](route.path, route.validate);
          router[route.method](route.path, checkValidationResult);
        }

        // Lastly, set the controller for this route.
        router[route.method](route.path, (request: Request, response: Response, next: NextFunction) => {
          route
            .action(request, response)
            .then(() => next())
            .catch((err: any) => next(err));
        });
      });

      // Handle unexpected/uncaught errors
      router.use(Api.handleUncaughtException);

      // Serve the application at the given port
      // When running tests we don't really need to have the app listen on a network port
      if (process.env.NODE_ENV !== 'test') {
        router.listen(port, () => {
          // Success callback
          console.log(`Toy API Service. Listening at http://localhost:${port}/`);
        });
      }

      router.use(devResponseLogger);

      return router;

    })
    // Log database connection errors
    .catch((error) => {
      console.log('TypeORM connection error: ', error);
    });
