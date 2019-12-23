import { NextFunction } from 'express-serve-static-core';
import { Request, Response, SortOrder } from '../@types/api';
import { Api } from '../lib/Api';

const DEFAULT_PER_PAGE = 10;
const DEFAULT_OFFSET = 0;

/**
 * Middleware which parses the GET route query string and enriches the request object.
 * It adds a pagination object containing a request route's pagination details.
 * It adds a sorting object containing a request route's sorting details of the response
 * It adds a search object containing a request route's search details
 *
 * @param request
 * @param response
 * @param next
 */
export function parseRequest(request: Request, response: Response, next: NextFunction): any {
  // If it's not a GET request, then none of these
  // request options are relevant.
  if (request.method.toLowerCase() === 'get') {
    try {
      request.pagination = {};
      request.sorting = {};
      request.search = {};

      sortOptions(request);
      paginationOptions(request);
      searchOptions(request);
    } catch (e) {
      return Api.badRequest(request, response, e.message);
    }
  }

  next();
}

function sortOptions(request: Request) {
  let sortOrder: string = request.query.order;
  const sortField: string = request.query.sort;

  // If the query param appears more than once, Express turns
  // it into an array, which we don't want.
  if (typeof sortOrder === 'object') {
    throw new Error(`Multiple query params found for sort order`);
  }
  if (typeof sortField === 'object') {
    throw new Error(`Multiple query params found for sort field`);
  }

  if (sortOrder) {
    sortOrder = sortOrder.toLowerCase();
  }

  // Is the sort field valid?
  if (sortField && request.sortableFields.indexOf(sortField) === -1) {
    throw new Error(`Invalid sort field: ${sortField}`);
  }

  // Is the sort order valid?
  if (sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc') {
    throw new Error(`Invalid sort order: ${sortOrder}`);
  }

  // Create the SortOptions object.
  // Default to ascending order if not otherwise specified.
  if (sortOrder) {
    request.sorting.sortOrder = sortOrder === 'desc' ? SortOrder.Descending : SortOrder.Ascending;
  }

  if (sortField) {
    request.sorting.sortField = sortField;
  }
}

function paginationOptions(request: Request) {
  // Set default values
  let perPage: number = DEFAULT_PER_PAGE;
  let offset: number = DEFAULT_OFFSET;

  // Start by setting defaults on the Request object
  request.pagination = {
    perPage,
    offset,
  };

  // Was an offset number given?
  if (request.query.offset) {
    // Try to convert it to an integer
    offset = parseInt(request.query.offset, 10);

    // Make sure it's valid and greater than or equal to 0
    if (isNaN(offset) || offset < 0) {
      throw new Error(`Invalid offset: ${request.query.offset}`);
    }
  }

  // Was a perPage number given?
  if (request.query.perPage) {
    // Try to convert it to an integer
    perPage = parseInt(request.query.perPage, 10);

    // Make sure it's valid and greater than 0
    if (isNaN(perPage) || perPage < 1) {
      throw new Error(`Invalid number of rows per page: ${request.query.perPage}`);
    }
  }

  // Apply pagination options to the Request object
  request.pagination = {
    perPage,
    offset,
  };
}

function searchOptions(request: Request) {
  const keywords: string = request.query.search;

  if (typeof keywords === 'object') {
    throw new Error(`Multiple search keyword params found`);
  }

  request.pagination.searchOptions = {
    keywords: keywords,
  };
}
