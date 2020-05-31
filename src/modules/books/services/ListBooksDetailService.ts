import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Books from '../infra/typeorm/entities/Books';
import IBooksRepository from '../repositories/IBooksRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Books> {
    const books = await this.booksRepository.findById(id);

    if (!books) {
      throw new AppError("This book doesn't exists", 400);
    }

    return books;
  }
}
