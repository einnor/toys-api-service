"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../@types/api");
const Api_1 = require("../lib/Api");
const DEFAULT_PER_PAGE = 10;
const DEFAULT_OFFSET = 0;
function parseRequest(request, response, next) {
    if (request.method.toLowerCase() === 'get') {
        try {
            request.pagination = {};
            request.sorting = {};
            request.search = {};
            sortOptions(request);
            paginationOptions(request);
            searchOptions(request);
        }
        catch (e) {
            return Api_1.Api.badRequest(request, response, e.message);
        }
    }
    next();
}
exports.parseRequest = parseRequest;
function sortOptions(request) {
    let sortOrder = request.query.order;
    const sortField = request.query.sort;
    if (typeof sortOrder === 'object') {
        throw new Error(`Multiple query params found for sort order`);
    }
    if (typeof sortField === 'object') {
        throw new Error(`Multiple query params found for sort field`);
    }
    if (sortOrder) {
        sortOrder = sortOrder.toLowerCase();
    }
    if (sortField && request.sortableFields.indexOf(sortField) === -1) {
        throw new Error(`Invalid sort field: ${sortField}`);
    }
    if (sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc') {
        throw new Error(`Invalid sort order: ${sortOrder}`);
    }
    if (sortOrder) {
        request.sorting.sortOrder = sortOrder === 'desc' ? api_1.SortOrder.Descending : api_1.SortOrder.Ascending;
    }
    if (sortField) {
        request.sorting.sortField = sortField;
    }
}
function paginationOptions(request) {
    let perPage = DEFAULT_PER_PAGE;
    let offset = DEFAULT_OFFSET;
    request.pagination = {
        perPage,
        offset,
    };
    if (request.query.offset) {
        offset = parseInt(request.query.offset, 10);
        if (isNaN(offset) || offset < 0) {
            throw new Error(`Invalid offset: ${request.query.offset}`);
        }
    }
    if (request.query.perPage) {
        perPage = parseInt(request.query.perPage, 10);
        if (isNaN(perPage) || perPage < 1) {
            throw new Error(`Invalid number of rows per page: ${request.query.perPage}`);
        }
    }
    request.pagination = {
        perPage,
        offset,
    };
}
function searchOptions(request) {
    const keywords = request.query.search;
    if (typeof keywords === 'object') {
        throw new Error(`Multiple search keyword params found`);
    }
    request.pagination.searchOptions = {
        keywords: keywords,
    };
}
//# sourceMappingURL=ParseRequest.js.map