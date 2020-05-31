import request from 'supertest';

import { getConnection, Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    // await connection.query('DROP TABLE IF EXISTS authors');
    // await connection.query('DROP TABLE IF EXISTS categories');
    // await connection.query('DROP TABLE IF EXISTS books');
    // await connection.query('DROP TABLE IF EXISTS migrations');

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

  it('should be able to create a new author', async () => {
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

  it('should not be able to create a author with one e-mail thats already registered', async () => {
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

  it('should be able to create a new category', async () => {
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

  it('should be able to create a new book', async () => {
    const author = await request(app).post('/authors').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      description: 'heres a description',
    });

    const category = await request(app).post('/categories').send({
      name: 'Filosofia',
    });

    const response = await request(app).post('/books').send({
      author_id: author.body.id,
      category_id: category.body.id,
      title: 'Organon',
      summary: 'Introdução a lógica formal',
      contents: 'Sumário do livro',
      price: 50,
      pages: 60,
      isbn: '123456789',
      date_publication: '2012-01-26T20:51:50.417Z',
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        author_id: author.body.id,
        category_id: category.body.id,
        title: 'Organon',
        summary: 'Introdução a lógica formal',
        contents: 'Sumário do livro',
        price: 50,
        pages: 60,
        isbn: '123456789',
        date_publication: '2012-01-26T20:51:50.417Z',
      }),
    );
  });

  it('should not be able to create a book with same title', async () => {
    const author = await request(app).post('/authors').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      description: 'heres a description',
    });

    const category = await request(app).post('/categories').send({
      name: 'Filosofia',
    });

    const books = await request(app).post('/books').send({
      author_id: author.body.id,
      category_id: category.body.id,
      title: 'Organon',
      summary: 'Introdução a lógica formal',
      contents: 'Sumário do livro',
      price: 50,
      pages: 60,
      isbn: '123456789',
      date_publication: '2012-01-26T20:51:50.417Z',
    });

    expect(books.body).toEqual(
      expect.objectContaining({
        author_id: author.body.id,
        category_id: category.body.id,
        title: 'Organon',
        summary: 'Introdução a lógica formal',
        contents: 'Sumário do livro',
        price: 50,
        pages: 60,
        isbn: '123456789',
        date_publication: '2012-01-26T20:51:50.417Z',
      }),
    );

    const response = await request(app).post('/books').send({
      author_id: author.body.id,
      category_id: category.body.id,
      title: 'Organon',
      summary: 'Introdução a lógica formal',
      contents: 'Sumário do livro',
      price: 50,
      pages: 60,
      isbn: '123456789',
      date_publication: '2012-01-26T20:51:50.417Z',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a book with the same isbn', async () => {
    const author = await request(app).post('/authors').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      description: 'heres a description',
    });

    const category = await request(app).post('/categories').send({
      name: 'Filosofia',
    });

    const books = await request(app).post('/books').send({
      author_id: author.body.id,
      category_id: category.body.id,
      title: 'Organon',
      summary: 'Introdução a lógica formal',
      contents: 'Sumário do livro',
      price: 50,
      pages: 60,
      isbn: '123456789',
      date_publication: '2012-01-26T20:51:50.417Z',
    });

    expect(books.body).toEqual(
      expect.objectContaining({
        author_id: author.body.id,
        category_id: category.body.id,
        title: 'Organon',
        summary: 'Introdução a lógica formal',
        contents: 'Sumário do livro',
        price: 50,
        pages: 60,
        isbn: '123456789',
        date_publication: '2012-01-26T20:51:50.417Z',
      }),
    );

    const response = await request(app).post('/books').send({
      author_id: author.body.id,
      category_id: category.body.id,
      title: 'Organon',
      summary: 'Introdução a lógica formal',
      contents: 'Sumário do livro',
      price: 50,
      pages: 60,
      isbn: '123456789',
      date_publication: '2012-01-26T20:51:50.417Z',
    });

    expect(response.status).toBe(400);
  });
});
