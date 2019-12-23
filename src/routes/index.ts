import { routes as Brands } from './Brands';

import { Route } from '../@types/api';

// All routes combined
export const Routes: Route[] = [];

// Apply routes here
Routes.push.apply(Routes, Brands);
