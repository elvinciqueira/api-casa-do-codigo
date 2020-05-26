import { getRepository } from 'typeorm';

import Books from '../models/Books';
import Authors from '../models/Authors';
import Category from '../models/Category';
// import AppError from '../errors/AppError';

interface IRequest {
  author: Authors;
  category: Category;
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
    author,
    category,
    pages,
    price,
    isbn,
    date_publication,
    summary,
    contents,
  }: IRequest): Promise<Books> {
    const booksRepository = getRepository(Books);

    const books = booksRepository.create({
      category,
      author,
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
