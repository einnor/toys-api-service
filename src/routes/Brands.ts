import { BrandController as Controller } from '../controllers/Brand';
import { Route } from '../@types/api';
import { Brands } from '../lib/Brands';

export const routes: Route[] = [
  {
    path: '/api/v1/brands',
    method: 'get',
    action: Controller.getListing,
    cache: true,
  },
  {
    path: '/api/v1/brands',
    method: 'post',
    action: Controller.save,
    validate: Brands.validators.save,
    cache: false,
  },
];
