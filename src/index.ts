import * as dotenv from 'dotenv';

/**
 * Load environment variables from local .env file.
 * Any variables that have already been set in will not be overwritten.
 */
dotenv.config();

/**
 * Now load the main entry point and initialize.
 */
import { app } from './app';

app();
