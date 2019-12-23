"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Toy_1 = require("../controllers/Toy");
const Toys_1 = require("../lib/Toys");
exports.routes = [
    {
        path: '/api/v1/toys',
        method: 'get',
        action: Toy_1.ToyController.getListing,
        cache: true,
    },
    {
        path: '/api/v1/toys',
        method: 'post',
        action: Toy_1.ToyController.save,
        validate: Toys_1.Toys.validators.save,
        cache: false,
    },
];
//# sourceMappingURL=Toys.js.map