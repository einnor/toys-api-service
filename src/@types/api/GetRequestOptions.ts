import { SearchOptions, SortOrder } from '.';

export type GetRequestOptions = {
  sortField?: string;
  sortOrder?: SortOrder;
  perPage?: number;
  offset?: number;
  searchOptions?: SearchOptions;
}
