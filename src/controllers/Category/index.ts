import { Categories } from '../../lib/Categories';
import { Api } from '../../lib/Api';
import { Request, Response } from '../../@types/api';
import { Listing, Details } from '../../@types/categories';

export class CategoryController {
  /**
   * GET
   * Retrieve a list of Categories formatted specifically for the frontend.
   *
   * @param request
   * @param response
   */
  public static async getListing (request: Request, response: Response) {
    // Pagination options
    const { perPage, offset } = request.pagination;

    // Sorting options
    const { sortField, sortOrder } =  request.sorting;

    try {
      // Get categories from the database, paginated/filtered/sorted
      const listing: Listing = await Categories.getListing({
        perPage,
        offset,
        sortField,
        sortOrder,
      });

      return Api.success(response, listing);
    } catch (error) {
      return Api.internalError(request, response, error);
    }
  };

  /**
   * POST
   * Save a category and return the result object
   *
   * @param request
   * @param response
   */
  public static async save (request: Request, response: Response) {
    const { name } = request.body;

    try {
      const category: Details | undefined = await Categories.save({ name });

      return Api.success(response, category);
    } catch (error) {
      return Api.internalError(request, response, error);
    }
  };
}
