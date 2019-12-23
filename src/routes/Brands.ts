import { BrandController as Controller } from '../controllers/Brand';
import { Route } from '../@types/api';

export const routes: Route[] = [
  {
    path: '/brands',
    method: 'get',
    action: Controller.getBrandListing,
    cache: true,
  },
];
