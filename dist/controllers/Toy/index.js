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
            return Api_1.Api.handleExceptions(request, response, error);
        }
    }
    ;
    static async getOne(request, response) {
        const { id } = request.params;
        try {
            const toy = await Toys_1.Toys.getById({ id });
            if (!toy) {
                return Api_1.Api.notFound(request, response, 'Record not found');
            }
            return Api_1.Api.success(response, toy);
        }
        catch (error) {
            return Api_1.Api.handleExceptions(request, response, error);
        }
    }
    ;
    static async save(request, response) {
        const { brandId, categoryId, model, description, price, imageUrl } = request.body;
        try {
            const toy = await Toys_1.Toys.save({ brandId, categoryId, model, description, price, imageUrl });
            if (!toy) {
                return Api_1.Api.notFound(request, response, 'Records not found');
            }
            return Api_1.Api.successfullyAdded(response, toy);
        }
        catch (error) {
            return Api_1.Api.handleExceptions(request, response, error);
        }
    }
    ;
    static async update(request, response) {
        const { id } = request.params;
        const { brandId, categoryId, model, description, price, imageUrl } = request.body;
        try {
            const toy = await Toys_1.Toys.update(id, { brandId, categoryId, model, description, price, imageUrl });
            if (!toy) {
                return Api_1.Api.notFound(request, response, 'Records not found');
            }
            return Api_1.Api.successfullyAdded(response, toy);
        }
        catch (error) {
            return Api_1.Api.handleExceptions(request, response, error);
        }
    }
    ;
    static async remove(request, response) {
        const { id } = request.params;
        try {
            const toy = await Toys_1.Toys.remove({ id });
            if (!toy) {
                return Api_1.Api.notFound(request, response, 'Records not found');
            }
            return Api_1.Api.success(response, toy);
        }
        catch (error) {
            return Api_1.Api.handleExceptions(request, response, error);
        }
    }
    ;
}
exports.ToyController = ToyController;
//# sourceMappingURL=index.js.map