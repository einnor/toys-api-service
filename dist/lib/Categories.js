"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const { check } = require('express-validator');
const Category_1 = require("../entity/Category");
class Categories {
    static async getListing({ perPage, offset, sortField, sortOrder }) {
        const sortColumn = sortField ? sortField : 'createdAt';
        const queryBuilder = typeorm_1.getManager().createQueryBuilder(Category_1.Category, 'category');
        let query = queryBuilder
            .orderBy(`category.${sortColumn}`, sortOrder);
        query = query.skip(offset).take(perPage);
        const [results, totalResults] = await query.getManyAndCount();
        const pagedListing = {
            total: totalResults,
            pageData: results,
        };
        return pagedListing;
    }
    static async getOne(conditions) {
        const record = await typeorm_1.getManager().getRepository(Category_1.Category).findOne({
            where: Object.assign({}, conditions)
        });
        return record;
    }
    static async save({ name }) {
        const exists = await this.getOne({ name });
        console.log(exists);
        if (exists) {
            return;
        }
        const category = new Category_1.Category();
        category.name = name;
        const record = await typeorm_1.getManager().getRepository(Category_1.Category).save(category);
        return record;
    }
}
Categories.validators = {
    save: [
        check('name', 'Invalid category name').isLength({
            min: 2,
            max: 50,
        }),
    ],
};
exports.Categories = Categories;
//# sourceMappingURL=Categories.js.map