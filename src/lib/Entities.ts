import { getManager, FindOneOptions, SaveOptions, FindManyOptions } from 'typeorm';

export class Entities {

  public static getManager() {
    return getManager();
  }

  public static async get<T>(entityName: string, conditions?: FindManyOptions<T>): Promise<Array<T>> {
    if (typeof conditions === 'undefined') {
      conditions = {};
    }

    return getManager().find<T>(entityName, conditions);
  }

  public static async getOne<T>(entityName: string, conditions: FindOneOptions<T>) {
    const repo = getManager().getRepository<T>(entityName.toString());
    const item = repo.findOne(conditions);

    return item;
  }


  public static async remove(entityName: string, item: any) {
    const repo = getManager().getRepository(entityName.toString());

    return repo.remove(item);
  }


  public static async save<T>(entityName: string, entity: T, options?: SaveOptions) {
    const repo = getManager().getRepository(entityName.toString());
    return repo.save<T>(entity, options);
  }


  public static async getAndCount<T>(entityName: string, conditions?: FindManyOptions<T>): Promise<[Array<T>, number]> {
    if (typeof conditions === 'undefined') {
      conditions = {};
    }

    return getManager().findAndCount<T>(entityName, conditions);
  }


}

