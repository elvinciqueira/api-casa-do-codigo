import { Request, Response } from 'express';

import CreateBooksService from '../services/CreateBooksService';

export default class CreateBooksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      category_id,
      author_id,
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
      category_id,
      author_id,
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
