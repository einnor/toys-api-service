"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brand_1 = require("../controllers/Brand");
const Brands_1 = require("../lib/Brands");
exports.routes = [
    {
        path: '/api/v1/brands',
        method: 'get',
        action: Brand_1.BrandController.getListing,
        cache: true,
    },
    {
        path: '/api/v1/brands',
        method: 'post',
        action: Brand_1.BrandController.save,
        validate: Brands_1.Brands.validators.save,
        cache: false,
    },
];
//# sourceMappingURL=Brands copy.js.map