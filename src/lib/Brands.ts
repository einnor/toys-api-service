import { getManager } from 'typeorm';
import { check } from 'express-validator';
import { Brand } from '../entity/Brand';
import { Listing, Details } from '../@types/brands';
import { GetRequestOptions } from '../@types/api/GetRequestOptions';
import { Entities } from './Entities';
import { ForbiddenException } from './exceptions';

export class Brands {

  public static validators = {
    save: [
      // Name
      check('name', 'Invalid brand name').isLength({
        min: 2,
        max: 50,
      }),
    ],
  };

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

  public static async getOne(conditions: object): Promise<Details | undefined> {
    const record: Details | undefined = await Entities.getOne(Brand, {
      where: { ...conditions }
    });

    return record;
  }

  public static async save({ name }: { name: string}): Promise<Details> {

    const exists = await this.getOne({ name });
    if (exists) {
      throw new ForbiddenException();
    }

    const brand = new Brand();
    brand.name = name;
    const record = await Entities.save(Brand, brand);

    return record;
  }
}