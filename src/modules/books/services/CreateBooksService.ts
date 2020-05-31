import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Books from '../infra/typeorm/entities/Books';
import IBooksRepository from '../repositories/IBooksRepository';

interface IRequest {
  author_id: string;
  category_id: string;
  title: string;
  summary: string;
  contents: string;
  isbn: string;
  price: number;
  pages: number;
  date_publication: Date;
}

@injectable()
class CreateBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) { }

  public async execute({
    title,
    author_id,
    category_id,
    pages,
    price,
    isbn,
    date_publication,
    summary,
    contents,
  }: IRequest): Promise<Books> {
    const checkTitleExists = await this.booksRepository.findByTitle(title);

    if (checkTitleExists) {
      throw new AppError('Title already exists', 400);
    }

    const checkIsbnExists = await this.booksRepository.findByIsbn(isbn);

    if (checkIsbnExists) {
      throw new AppError('No duplicated isbn allowed', 400);
    }

    const books = await this.booksRepository.create({
      category_id,
      author_id,
      title,
      pages,
      price,
      isbn,
      date_publication,
      summary,
      contents,
    });

    return books;
  }
}

export default CreateBooksService;
