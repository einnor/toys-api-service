"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const { check } = require('express-validator');
const Brand_1 = require("../entity/Brand");
class Brands {
    static async getListing({ perPage, offset, sortField, sortOrder }) {
        const sortColumn = sortField ? sortField : 'createdAt';
        const queryBuilder = typeorm_1.getManager().createQueryBuilder(Brand_1.Brand, 'brand');
        let query = queryBuilder
            .orderBy(`brand.${sortColumn}`, sortOrder);
        query = query.skip(offset).take(perPage);
        const [results, totalResults] = await query.getManyAndCount();
        const pagedListing = {
            total: totalResults,
            pageData: results,
        };
        return pagedListing;
    }
    static async save({ name }) {
        const brand = new Brand_1.Brand();
        brand.name = name;
        const record = await typeorm_1.getManager().getRepository(Brand_1.Brand).save(brand);
        return record;
    }
}
Brands.validators = {
    save: [
        check('name', 'Invalid name').isLength({
            min: 2,
            max: 50,
        }),
    ],
};
exports.Brands = Brands;
//# sourceMappingURL=Brands.js.map