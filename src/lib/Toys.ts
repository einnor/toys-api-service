import { getManager } from 'typeorm';
import { check } from 'express-validator';
import { Toy } from '../entity/Toy';
import { Listing, Details } from '../@types/toys';
import { GetRequestOptions } from '../@types/api/GetRequestOptions';
import { Brands } from './Brands';
import { Categories } from './Categories';
import { Entities } from './Entities';
import { ForbiddenException, ResourceNotFoundException } from './exceptions';

export class Toys {

  public static validators = {
    save: [
      // BrandId
      check('brandId', 'Invalid brand id').isUUID(),

      // CategoryId
      check('categoryId', 'Invalid category id').isUUID(),

      // Model
      check('model', 'Invalid model').isLength({
        min: 2,
        max: 50,
      }),

      // Description
      check('description', 'Invalid description').isLength({
        min: 10,
        max: 1000,
      }),

      // Price
      check('price', 'Invalid price').isNumeric(),

      // ImageUrl
      check('imageUrl', 'Invalid image url').isURL(),
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

    // Join brand
    query = query.leftJoinAndSelect('toy.brand', 'brand')

    // Join category
    query = query.leftJoinAndSelect('toy.category', 'category')

    // Get the results
    const [results, totalResults] = await query.getManyAndCount();

    const pagedListing: Listing = {
      total: totalResults,
      pageData: results,
    };

    return pagedListing;
  }

  public static async getById({ id }: { id: string }): Promise<Details> {
    const record = await this.getOne({ id });

    if (!record) {
      throw new ResourceNotFoundException();
    }

    return record;
  }

  public static async getOne(conditions: object): Promise<Details | undefined> {
    const record: Details | undefined = await Entities.getOne(Toy, {
      where: { ...conditions }
    });

    return record;
  }

  public static async save({ brandId, categoryId, model, description, price, imageUrl }): Promise<Details> {

    const exists = await this.getOne({ brandId, categoryId, model });
    if (exists) {
      throw new ForbiddenException();
    }

    const brand = await Brands.getOne({ id: brandId });
    const category = await Categories.getOne({ id: categoryId });

    if (!brand || !category) {
      throw new ForbiddenException();
    }

    const toy = new Toy();
    toy.brand = brand;
    toy.category = category;
    toy.model = model;
    toy.description = description;
    toy.price = price;
    toy.imageUrl = imageUrl;

    const record = await Entities.save(Toy, toy);

    return record;
  }

  public static async update(id: string, { brandId, categoryId, model, description, price, imageUrl }): Promise<Details> {

    const toy = await this.getOne({ id });
    if (!toy) {
      throw new ResourceNotFoundException();
    }

    const brand = await Brands.getOne({ id: brandId });
    const category = await Categories.getOne({ id: categoryId });

    if (!brand || !category) {
      throw new ForbiddenException();
    }

    toy.brand = brand;
    toy.category = category;
    toy.model = model;
    toy.description = description;
    toy.price = price;
    toy.imageUrl = imageUrl;

    const record = await Entities.save(Toy, toy);

    return record;
  }

  public static async remove({ id }): Promise<Details> {

    const toy = await this.getOne({ id });
    if (!toy) {
      throw new ResourceNotFoundException();
    }

    await Entities.remove(Toy, toy);

    return toy;
  }
}