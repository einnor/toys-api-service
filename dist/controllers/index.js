"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brands_1 = require("../lib/Brands");
const Api_1 = require("../lib/Api");
class BrandController {
    static async getBrandListing(request, response) {
        const { perPage, offset } = request.pagination;
        const { sortField, sortOrder } = request.sorting;
        try {
            const listing = await Brands_1.Brands.getListing({
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
}
exports.BrandController = BrandController;
//# sourceMappingURL=index.js.map