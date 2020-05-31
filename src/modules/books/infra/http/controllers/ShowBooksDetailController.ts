import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListBooksDetailService from '@modules/books/services/ListBooksDetailService';

export default class ShowBooksDetailController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listBooks = container.resolve(ListBooksDetailService);

    const books = await listBooks.execute({ id });

    return response.json(books);
  }
}
