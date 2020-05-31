import { injectable, inject } from 'tsyringe';

import Books from '../infra/typeorm/entities/Books';
import IBooksRepository from '../repositories/IBooksRepository';

@injectable()
export default class ListBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) { }

  public async execute(): Promise<Books[]> {
    const books = await this.booksRepository.findAllBooks();

    return books;
  }
}
