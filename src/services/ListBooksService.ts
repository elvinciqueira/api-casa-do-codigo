import { getRepository } from 'typeorm';

import Books from '../models/Books';

export default class ListBooksService {
  public async execute(): Promise<Books[]> {
    const booksRepository = getRepository(Books);

    const books = await booksRepository.find();

    return books;
  }
}
