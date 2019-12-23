import { ToyController as Controller } from '../controllers/Toy';
import { Route } from '../@types/api';
import { Toys } from '../lib/Toys';

export const routes: Route[] = [
  {
    path: '/api/v1/toys',
    method: 'get',
    action: Controller.getListing,
    cache: true,
  },
  // {
  //   path: '/api/v1/toys',
  //   method: 'post',
  //   action: Controller.save,
  //   validate: Toys.validators.save,
  //   cache: false,
  // },
];
