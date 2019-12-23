"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Categories_1 = require("../../lib/Categories");
const Api_1 = require("../../lib/Api");
class CategoryController {
    static async getListing(request, response) {
        const { perPage, offset } = request.pagination;
        const { sortField, sortOrder } = request.sorting;
        try {
            const listing = await Categories_1.Categories.getListing({
                perPage,
                offset,
                sortField,
                sortOrder,
            });
            return Api_1.Api.success(response, listing);
        }
        catch (error) {
            return Api_1.Api.internalError(request, response, error);
        }
    }
    ;
    static async save(request, response) {
        const { name } = request.body;
        console.log(name);
        try {
            const category = await Categories_1.Categories.save({ name });
            return Api_1.Api.success(response, category);
        }
        catch (error) {
            return Api_1.Api.internalError(request, response, error);
        }
    }
    ;
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=index.js.map