import { BrandController as Controller } from '../controllers/Brand';
import { Brands } from '../lib/Brands';
import { Route } from '../@types/api';

export const routes: Route[] = [
  {
    path: '/brands',
    method: 'GET',
    action: Controller.getBrandListing,
    cache: true,
  },
];
