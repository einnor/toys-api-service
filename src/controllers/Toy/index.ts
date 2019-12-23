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
   * GET
   * Retrieve a Toy by id
   *
   * @param request
   * @param response
   */
  public static async getOne (request: Request, response: Response) {
    // Param
    const { id } = request.params;

    try {
      const toy: Details | undefined = await Toys.getOne({ id });

      if (!toy) {
        return Api.notFound(request, response, 'Record not found');
      }

      return Api.success(response, toy);
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
      const toy: Details | undefined = await Toys.save({ brandId, categoryId, model, description, price, imageUrl });

      if (!toy) {
        return Api.notFound(request, response, 'Records not found');
      }

      return Api.success(response, toy);
    } catch (error) {
      return Api.internalError(request, response, error);
    }
  };

  /**
   * PUT
   * Update a toy and return the result object
   *
   * @param request
   * @param response
   */
  public static async update (request: Request, response: Response) {
    const { id } = request.params;
    const { brandId, categoryId, model, description, price, imageUrl } = request.body;

    try {
      const toy: Details | undefined = await Toys.update(id, { brandId, categoryId, model, description, price, imageUrl });

      if (!toy) {
        return Api.notFound(request, response, 'Records not found');
      }

      return Api.success(response, toy);
    } catch (error) {
      return Api.internalError(request, response, error);
    }
  };

  /**
   * DELETE
   * Remove a toy by id
   *
   * @param request
   * @param response
   */
  public static async remove (request: Request, response: Response) {
    const { id } = request.params;

    try {
      const toy: Details | undefined = await Toys.remove({ id });

      if (!toy) {
        return Api.notFound(request, response, 'Records not found');
      }

      return Api.success(response, toy);
    } catch (error) {
      return Api.internalError(request, response, error);
    }
  };
}
