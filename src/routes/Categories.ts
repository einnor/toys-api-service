import { CategoryController as Controller } from '../controllers/Category';
import { Route } from '../@types/api';
import { Categories } from '../lib/Categories';

export const routes: Route[] = [
  {
    path: '/api/v1/categories',
    method: 'get',
    action: Controller.getListing,
    cache: true,
  },
  {
    path: '/api/v1/categories',
    method: 'post',
    action: Controller.save,
    validate: Categories.validators.save,
    cache: false,
  },
];
