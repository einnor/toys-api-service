import { getManager } from 'typeorm';
import { Brand } from '../entity/Brand';
import { Listing } from '../@types/brands';
import { GetRequestOptions } from '../@types/api/GetRequestOptions';

export class Brands {
  public static async getListing({ perPage, offset, sortField, sortOrder }: GetRequestOptions): Promise<Listing> {

    const sortColumn: string = sortField ? sortField : 'createdAt';

    // Create a QueryBuilder instance for the brand entity
    const queryBuilder = getManager().createQueryBuilder<Brand>(Brand, 'brand');

    // Sort column and sort order
    let query = queryBuilder
      .orderBy(`brand.${sortColumn}`, sortOrder);

    // Lastly, set the pagination conditions
    query = query.skip(offset).take(perPage);

    // Get the results
    const [results, totalResults] = await query.getManyAndCount();

    const pagedListing: Listing = {
      total: totalResults,
      pageData: results,
    };

    return pagedListing;
  }
}