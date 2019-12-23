"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Toy_1 = require("../controllers/Toy");
exports.routes = [
    {
        path: '/api/v1/toys',
        method: 'get',
        action: Toy_1.ToyController.getListing,
        cache: true,
    },
];
//# sourceMappingURL=Toys.js.map