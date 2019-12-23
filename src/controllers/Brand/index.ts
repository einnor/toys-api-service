import { Brands } from '../../lib/Brands';
import { Api } from '../../lib/Api';
import { Request, Response } from '../../@types/api';
import { Listing, Details } from '../../@types/brands';

export class BrandController {
  /**
   * GET
   * Retrieve a list of Brands formatted specifically for the frontend.
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
      // Get Brands from the database, paginated/filtered/sorted
      const listing: Listing = await Brands.getListing({
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
   * GET
   * Retrieve a list of Brands formatted specifically for the frontend.
   *
   * @param request
   * @param response
   */
  public static async save (request: Request, response: Response) {
    const { name } = request.body;

    try {
      const brand: Details | undefined = await Brands.save({ name });

      return Api.success(response, brand);
    } catch (error) {
      return Api.internalError(request, response, error);
    }
  };
}
