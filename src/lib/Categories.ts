import { getManager } from 'typeorm';
import { check } from 'express-validator';
import { Category } from '../entity/Category';
import { Listing, Details } from '../@types/categories';
import { GetRequestOptions } from '../@types/api/GetRequestOptions';
import { Entities } from './Entities';

export class Categories {

  public static validators = {
    save: [
      // Name
      check('name', 'Invalid category name').isLength({
        min: 2,
        max: 50,
      }),
    ],
  };

  public static async getListing({ perPage, offset, sortField, sortOrder }: GetRequestOptions): Promise<Listing> {

    const sortColumn: string = sortField ? sortField : 'createdAt';

    // Create a QueryBuilder instance for the category entity
    const queryBuilder = getManager().createQueryBuilder<Category>(Category, 'category');

    // Sort column and sort order
    let query = queryBuilder
      .orderBy(`category.${sortColumn}`, sortOrder);

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
    const record: Details | undefined = await Entities.getOne(Category.toString(), {
      where: { ...conditions }
    });

    return record;
  }

  public static async save({ name }: { name: string}): Promise<Details | undefined> {

    const exists = await this.getOne({ name });
    console.log(exists);
    if (exists) {
      return;
    }

    const category = new Category();
    category.name = name;
   const record = await getManager().getRepository(Category).save<Category>(category);

    return record;
  }
}