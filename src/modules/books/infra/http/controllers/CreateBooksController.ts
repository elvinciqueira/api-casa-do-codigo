import { Request, Response } from 'express';

import CreateBooksService from '@modules/books/services/CreateBooksService';
import ListBooksService from '@modules/books/services/ListBooksService';

export default class CreateBooksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showBooks = new ListBooksService();

    const books = await showBooks.execute();

    return response.json(books);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      author_id,
      category_id,
      title,
      pages,
      isbn,
      price,
      date_publication,
      summary,
      contents,
    } = request.body;

    const createBooks = new CreateBooksService();

    const books = await createBooks.execute({
      author_id,
      category_id,
      title,
      pages,
      isbn,
      price,
      date_publication,
      summary,
      contents,
    });

    return response.json(books);
  }
}
