import request from 'supertest';

import { getConnection, Connection } from 'typeorm';
import createConnection from '../../database';

import app from '../../app';

let connection: Connection;

describe('Books', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM authors');
    await connection.query('DELETE FROM categories');
    await connection.query('DELETE FROM books');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('it should be able to create a new book', async () => {
    const response = await request(app).post('/books').send({
      title: 'Organon',
      sumary: 'Introdução a lógica formal',
      price: 50,
      pages: '60',
      isbn: '123456789',
      author_id: 1,
      category_id: 1,
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        title: 'Organon',
        sumary: 'Introdução a lógica formal',
        price: 50,
        pages: '60',
        isbn: '123456789',
        author_id: 1,
        category_id: 1,
      }),
    );
  });
});
