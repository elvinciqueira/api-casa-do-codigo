import { getRepository, Repository } from 'typeorm';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import ICreateBooksDTO from '@modules/books/dtos/ICreateBooksDTO';
import Books from '../entities/Books';

export default class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Books>;

  constructor() {
    this.ormRepository = getRepository(Books);
  }

  public async create({
    category_id,
    author_id,
    title,
    pages,
    price,
    isbn,
    date_publication,
    summary,
    contents,
  }: ICreateBooksDTO): Promise<Books> {
    const books = this.ormRepository.create({
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

    await this.ormRepository.save(books);

    return books;
  }

  public async findById(id: string): Promise<Books | undefined> {
    const books = this.ormRepository.findOne(id);

    return books;
  }

  public async findByTitle(title: string): Promise<Books | undefined> {
    const findTitle = await this.ormRepository.findOne({ where: { title } });

    return findTitle;
  }

  public async findByIsbn(isbn: string): Promise<Books | undefined> {
    const findIsbn = await this.ormRepository.findOne({ where: { isbn } });

    return findIsbn;
  }

  public async findAllBooks(): Promise<Books[]> {
    const books = this.ormRepository.find();

    return books;
  }
}
