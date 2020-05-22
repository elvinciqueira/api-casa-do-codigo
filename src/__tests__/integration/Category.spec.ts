import request from 'supertest';

import { getConnection, Connection } from 'typeorm';
import createConnection from '../../database';

import app from '../../app';

let connection: Connection;

describe('Category', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM categories');
    await connection.query('DELETE FROM authors');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('it should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Ficção Cientifica',
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ficção Cientifica',
      }),
    );
  });

  it('should not be able to create category with the same name', async () => {
    const category = await request(app).post('/categories').send({
      name: 'Ficção Cientifica',
    });

    expect(category.body).toEqual(
      expect.objectContaining({
        name: 'Ficção Cientifica',
      }),
    );

    const response = await request(app).post('/categories').send({
      name: 'Ficção Cientifica',
    });

    expect(response.status).toBe(400);
  });
});
