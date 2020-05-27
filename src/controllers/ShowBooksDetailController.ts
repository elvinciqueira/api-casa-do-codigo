import { Request, Response } from 'express';

import ListBooksDetailService from '../services/ListBooksDetailService';

export default class ShowBooksDetailController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listBooks = new ListBooksDetailService();

    const books = await listBooks.execute({ id });

    return response.json(books);
  }
}
