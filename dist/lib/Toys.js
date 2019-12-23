"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_validator_1 = require("express-validator");
const Toy_1 = require("../entity/Toy");
const Brands_1 = require("./Brands");
const Categories_1 = require("./Categories");
class Toys {
    static async getListing({ perPage, offset, sortField, sortOrder }) {
        const sortColumn = sortField ? sortField : 'createdAt';
        const queryBuilder = typeorm_1.getManager().createQueryBuilder(Toy_1.Toy, 'toy');
        let query = queryBuilder
            .orderBy(`toy.${sortColumn}`, sortOrder);
        query = query.skip(offset).take(perPage);
        const [results, totalResults] = await query.getManyAndCount();
        const pagedListing = {
            total: totalResults,
            pageData: this.transform(results),
        };
        return pagedListing;
    }
    static transform(results) {
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
    static async getOne(conditions) {
        const record = await typeorm_1.getManager().getRepository(Toy_1.Toy).findOne({
            where: Object.assign({}, conditions)
        });
        if (!record) {
            return;
        }
        return this.transform([record])[0];
    }
    static async save({ brandId, categoryId, model, description, price, imageUrl }) {
        const exists = await this.getOne({ name });
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
        const record = await typeorm_1.getManager().getRepository(Toy_1.Toy).save(toy);
        return this.transform([record])[0];
    }
}
Toys.validators = {
    save: [
        express_validator_1.check('name', 'Invalid brand name').isLength({
            min: 2,
            max: 50,
        }),
    ],
};
exports.Toys = Toys;
//# sourceMappingURL=Toys.js.map