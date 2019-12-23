"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../controllers/Category");
const Categories_1 = require("../lib/Categories");
exports.routes = [
    {
        path: '/api/v1/categories',
        method: 'get',
        action: Category_1.CategoryController.getListing,
        cache: true,
    },
    {
        path: '/api/v1/categories',
        method: 'post',
        action: Category_1.CategoryController.save,
        validate: Categories_1.Categories.validators.save,
        cache: false,
    },
];
//# sourceMappingURL=Categories.js.map