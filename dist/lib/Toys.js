"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Toy_1 = require("../entity/Toy");
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
}
exports.Toys = Toys;
//# sourceMappingURL=Toys.js.map