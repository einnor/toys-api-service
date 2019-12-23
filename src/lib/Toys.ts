import { getManager } from 'typeorm';
import { check } from 'express-validator';
import { Toy } from '../entity/Toy';
import { Listing, Details } from '../@types/toys';
import { GetRequestOptions } from '../@types/api/GetRequestOptions';
import { Brands } from './Brands';
import { Categories } from './Categories';

export class Toys {

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
    const queryBuilder = getManager().createQueryBuilder<Toy>(Toy, 'toy');

    //  Sort column and sort order
    let query = queryBuilder
      .orderBy(`toy.${sortColumn}`, sortOrder);

    // Lastly, set the pagination conditions
    query = query.skip(offset).take(perPage);

    // Get the results
    const [results, totalResults] = await query.getManyAndCount();

    const pagedListing: Listing = {
      total: totalResults,
      pageData: this.transform(results),
    };

    return pagedListing;
  }

  public static transform(results: Toy[]) {
    return results.map((toy) => ({
      id: toy.id,
      brand: toy.brand.name,
      model: toy.model,
      category: toy.category.name,
      description: toy.description,
      price: toy.price,
      imageUrl: toy.imageUrl,
      createdAt: toy.createdAt,
      updatedAt: toy.updatedAt,
    }));
  }

  public static async getOne(conditions: object): Promise<Details | undefined> {
    const record = await getManager().getRepository(Toy).findOne({
      where: { ...conditions }
    });

    if (!record) {
      return;
    }

    return this.transform([record])[0];
  }

  public static async save({ brandId, categoryId, model, description, price, imageUrl }): Promise<Details | undefined> {

    const exists = await this.getOne({ name });
    if (exists) {
      return;
    }

    const brand = await Brands.getOne({ id: brandId });
    const category = await Categories.getOne({ id: categoryId });

    if (!brand || !category) {
      return;
    }

    const toy = new Toy();
    toy.brand = brand;
    toy.category = category;
    toy.model = model;
    toy.description = description;
    toy.price = price;
    toy.imageUrl = imageUrl;

   const record = await getManager().getRepository(Toy).save<Toy>(toy);

    return this.transform([record])[0];
  }
}