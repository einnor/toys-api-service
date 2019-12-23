"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brand_1 = require("../controllers/Brand");
exports.routes = [
    {
        path: '/brands',
        method: 'get',
        action: Brand_1.BrandController.getBrandListing,
        cache: true,
    },
];
//# sourceMappingURL=Brands.js.map