"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class Entities {
    static getManager() {
        return typeorm_1.getManager();
    }
    static async get(entityName, conditions) {
        if (typeof conditions === 'undefined') {
            conditions = {};
        }
        return typeorm_1.getManager().find(entityName, conditions);
    }
    static async getOne(entityName, conditions) {
        const repo = typeorm_1.getManager().getRepository(entityName.toString());
        const item = repo.findOne(conditions);
        return item;
    }
    static async remove(entityName, item) {
        const repo = typeorm_1.getManager().getRepository(entityName.toString());
        return repo.remove(item);
    }
    static async save(entityName, entity, options) {
        const repo = typeorm_1.getManager().getRepository(entityName.toString());
        return repo.save(entity, options);
    }
    static async getAndCount(entityName, conditions) {
        if (typeof conditions === 'undefined') {
            conditions = {};
        }
        return typeorm_1.getManager().findAndCount(entityName, conditions);
    }
}
exports.Entities = Entities;
//# sourceMappingURL=Entities.js.map