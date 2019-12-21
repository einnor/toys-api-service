import { GetRequestOptions } from '.';
import { Request as ExpressRequest } from 'express';

type Custom = {
  sortableFields: string[];
  pagination: GetRequestOptions;
  sorting: GetRequestOptions;
  search: GetRequestOptions;
};

export type Request = Custom & ExpressRequest;