"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_validator_1 = require("express-validator");
const Toy_1 = require("../entity/Toy");
const Brands_1 = require("./Brands");
const Categories_1 = require("./Categories");
const Entities_1 = require("./Entities");
class Toys {
    static async getListing({ perPage, offset, sortField, sortOrder }) {
        const sortColumn = sortField ? sortField : 'createdAt';
        const queryBuilder = typeorm_1.getManager().createQueryBuilder(Toy_1.Toy, 'toy');
        let query = queryBuilder
            .orderBy(`toy.${sortColumn}`, sortOrder);
        query = query.skip(offset).take(perPage);
        query = query.leftJoinAndSelect('toy.brand', 'brand');
        query = query.leftJoinAndSelect('toy.category', 'category');
        const [results, totalResults] = await query.getManyAndCount();
        const pagedListing = {
            total: totalResults,
            pageData: results,
        };
        return pagedListing;
    }
    static async getOne(conditions) {
        const record = await Entities_1.Entities.getOne(Toy_1.Toy, {
            where: Object.assign({}, conditions)
        });
        return record;
    }
    static async save({ brandId, categoryId, model, description, price, imageUrl }) {
        const exists = await this.getOne({ brandId, categoryId, model });
        if (exists) {
            return;
        }
        const brand = await Brands_1.Brands.getOne({ id: brandId });
        const category = await Categories_1.Categories.getOne({ id: categoryId });
        if (!brand || !category) {
            return;
        }
        const toy = new Toy_1.Toy();
        toy.brand = brand;
        toy.category = category;
        toy.model = model;
        toy.description = description;
        toy.price = price;
        toy.imageUrl = imageUrl;
        const record = await Entities_1.Entities.save(Toy_1.Toy, toy);
        return record;
    }
    static async remove({ id }) {
        const toy = await this.getOne({ id });
        if (!toy) {
            return;
        }
        await Entities_1.Entities.remove(Toy_1.Toy, toy);
        return toy;
    }
}
Toys.validators = {
    save: [
        express_validator_1.check('brandId', 'Invalid brand id').isUUID(),
        express_validator_1.check('categoryId', 'Invalid category id').isUUID(),
        express_validator_1.check('model', 'Invalid model').isLength({
            min: 2,
            max: 50,
        }),
        express_validator_1.check('description', 'Invalid description').isLength({
            min: 10,
            max: 1000,
        }),
        express_validator_1.check('price', 'Invalid price').isNumeric(),
        express_validator_1.check('imageUrl', 'Invalid image url').isURL(),
    ],
};
exports.Toys = Toys;
//# sourceMappingURL=Toys.js.map