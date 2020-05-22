import request from 'supertest';

import { getConnection, Connection } from 'typeorm';
import createConnection from '../../database';

import app from '../../app';

let connection: Connection;

describe('Authors', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM authors');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('it should be able to create a new author', async () => {
    const response = await request(app).post('/authors').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      description: 'some description',
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        description: 'some description',
      }),
    );
  });

  it('it should not be able to create a author with one e-mail thats already registered', async () => {
    const author = await request(app).post('/authors').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      description: 'some description',
    });

    expect(author.body).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        description: 'some description',
      }),
    );

    const response = await request(app).post('/authors').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      description: 'some description',
    });

    expect(response.status).toBe(400);
  });
});
