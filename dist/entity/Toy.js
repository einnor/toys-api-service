"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Numbers_1 = require("../lib/Numbers");
const Brand_1 = require("./Brand");
const Category_1 = require("./Category");
let Toy = class Toy {
    _convertDecimals() {
        this.price = Numbers_1.Numbers.convertToDecimal(this.price);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Toy.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Brand_1.Brand, brand => brand.toys),
    __metadata("design:type", Brand_1.Brand)
], Toy.prototype, "brand", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Toy.prototype, "model", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Category_1.Category, category => category.toys),
    __metadata("design:type", Category_1.Category)
], Toy.prototype, "category", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Toy.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('decimal', {
        precision: 15,
        scale: 2
    }),
    __metadata("design:type", Number)
], Toy.prototype, "price", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Toy.prototype, "imageUrl", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Toy.prototype, "_convertDecimals", null);
Toy = __decorate([
    typeorm_1.Entity()
], Toy);
exports.Toy = Toy;
//# sourceMappingURL=Toy.js.map