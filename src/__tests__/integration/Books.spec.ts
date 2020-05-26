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
    // await connection.query('DELETE FROM authors');
    // await connection.query('DELETE FROM categories');
    await connection.query('DELETE FROM books');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('it should be able to create a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Organon',
        summary: 'Introdução a lógica formal',
        contents: 'Sumário do livro',
        price: 50,
        pages: 60,
        isbn: '123456789',
        date_publication: new Date(2021, 4, 21),
        author_id: '0d1f8c0b-690c-4961-8b91-0927f559b811',
        category_id: 'd08cda50-a018-4ffa-a7bc-c4929cc77a9b',
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        title: 'Organon',
        summary: 'Introdução a lógica formal',
        contents: 'Sumário do livro',
        price: 50,
        pages: 60,
        isbn: '123456789',
        date_publication: new Date(2021, 4, 21),
        author_id: '0d1f8c0b-690c-4961-8b91-0927f559b811',
        category_id: 'd08cda50-a018-4ffa-a7bc-c4929cc77a9b',
      }),
    );
  });
});
