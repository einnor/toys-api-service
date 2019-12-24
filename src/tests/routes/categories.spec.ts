import { Application } from 'express';
import supertest from 'supertest';

import { testSetup } from '../__helpers__/testSetup';
import { app as getApp } from '../../app';

testSetup();

let request: supertest.SuperTest<supertest.Test>;
let app: Application;
const endpoint = '/api/v1/categories'

beforeAll(async () => {
  app = (await getApp()) as Application;
  request = supertest(app);
});

afterAll(() => {
  app.removeAllListeners();
});

describe('Category Routes', () => {
  it('should list toy catgories', async () => {
    const response = await request.get(endpoint);

    expect(response.status).toEqual(200);
    expect(response.body.total).toBeDefined();
    expect(response.body.pageData).toBeDefined();
  });

  it('should validate the name during create', async () => {
    const response = await request.post(endpoint).send({ name: '' });

    expect(response.status).toEqual(400);
  });

  // it('should successfully create and return 201', async () => {
  //   const response = await request.post(endpoint).send({ name: 'New Brand' });

  //   expect(response.status).toEqual(201);
  //   expect(response.body).toHaveProperty('id');
  //   expect(response.body).toHaveProperty('name');
  //   expect(response.body).toHaveProperty('createdAt');
  //   expect(response.body).toHaveProperty('updatedAt');
  //   expect(response.body.name).toBe('New Brand');
  // });
});