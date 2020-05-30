import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Books from '../infra/typeorm/entities/Books';

interface IRequest {
  id: string;
}

export default class ListBooksService {
  public async execute({ id }: IRequest): Promise<Books[]> {
    const booksRepository = getRepository(Books);

    const books = await booksRepository.find({ where: { id } });

    if (!books) {
      throw new AppError("This book doesn't exists", 400);
    }

    return books;
  }
}
