import { Toys } from '../../lib/Toys';
import { Api } from '../../lib/Api';
import { Request, Response } from '../../@types/api';
import { Listing, Details } from '../../@types/toys';

export class ToyController {
  /**
   * GET
   * Retrieve a list of Toys formatted specifically for the frontend.
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
      const listing: Listing = await Toys.getListing({
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
   * Save a toy and return the result object
   *
   * @param request
   * @param response
   */
  public static async save (request: Request, response: Response) {
    const { brandId, categoryId, model, description, price, imageUrl } = request.body;

    try {
      const brand: Details | undefined = await Toys.save({ brandId, categoryId, model, description, price, imageUrl });

      return Api.success(response, brand);
    } catch (error) {
      return Api.internalError(request, response, error);
    }
  };
}
