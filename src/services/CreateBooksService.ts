import { getRepository } from 'typeorm';

import Books from '../models/Books';
// import AppError from '../errors/AppError';

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

class CreateBooksService {
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
    const booksRepository = getRepository(Books);

    const books = booksRepository.create({
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

    await booksRepository.save(books);

    return books;
  }
}

export default CreateBooksService;
