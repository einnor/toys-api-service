"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const testSetup_1 = require("../__helpers__/testSetup");
const app_1 = require("../../app");
testSetup_1.testSetup();
let request;
let app;
const endpoint = '/api/v1/brands';
beforeAll(async () => {
    app = (await app_1.app());
    request = supertest_1.default(app);
});
afterAll(() => {
    app.removeAllListeners();
});
describe('Brand Routes', () => {
    it('should list toy brands', async () => {
        const response = await request.get(endpoint);
        expect(response.status).toEqual(200);
        expect(response.body.total).toBeDefined();
        expect(response.body.pageData).toBeDefined();
    });
    it('should validate the name during create', async () => {
        const response = await request.post(endpoint).send({ name: '' });
        expect(response.status).toEqual(400);
    });
});
//# sourceMappingURL=brands.spec copy.js.map