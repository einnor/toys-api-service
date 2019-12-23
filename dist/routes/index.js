"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Toys_1 = require("./Toys");
const Brands_1 = require("./Brands");
const Categories_1 = require("./Categories");
exports.Routes = [];
exports.Routes.push.apply(exports.Routes, Toys_1.routes);
exports.Routes.push.apply(exports.Routes, Brands_1.routes);
exports.Routes.push.apply(exports.Routes, Categories_1.routes);
//# sourceMappingURL=index.js.map