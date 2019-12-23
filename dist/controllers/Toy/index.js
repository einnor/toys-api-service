"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Toys_1 = require("../../lib/Toys");
const Api_1 = require("../../lib/Api");
class ToyController {
    static async getListing(request, response) {
        const { perPage, offset } = request.pagination;
        const { sortField, sortOrder } = request.sorting;
        try {
            const listing = await Toys_1.Toys.getListing({
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
exports.ToyController = ToyController;
//# sourceMappingURL=index.js.map