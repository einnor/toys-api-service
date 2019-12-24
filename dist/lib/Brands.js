"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_validator_1 = require("express-validator");
const Brand_1 = require("../entity/Brand");
const Entities_1 = require("./Entities");
const exceptions_1 = require("./exceptions");
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
    static async getOne(conditions) {
        const record = await Entities_1.Entities.getOne(Brand_1.Brand, {
            where: Object.assign({}, conditions)
        });
        return record;
    }
    static async save({ name }) {
        const exists = await this.getOne({ name });
        if (exists) {
            throw new exceptions_1.ForbiddenException();
        }
        const brand = new Brand_1.Brand();
        brand.name = name;
        const record = await Entities_1.Entities.save(Brand_1.Brand, brand);
        return record;
    }
}
Brands.validators = {
    save: [
        express_validator_1.check('name', 'Invalid brand name').isLength({
            min: 2,
            max: 50,
        }),
    ],
};
exports.Brands = Brands;
//# sourceMappingURL=Brands.js.map