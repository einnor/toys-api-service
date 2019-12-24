import { Application } from 'express';
import supertest from 'supertest';

import { testSetup } from '../__helpers__/testSetup';
import { app as getApp } from '../../app';

testSetup();

let request: supertest.SuperTest<supertest.Test>;
let app: Application;
const endpoint = '/api/v1/brands'

beforeAll(async () => {
  app = (await getApp()) as Application;
  request = supertest(app);
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

  it('should return 400 when provided with invalid name', async () => {
    const response = await request.post(endpoint).send({ name: '' });

    expect(response.status).toEqual(400);
  });
});