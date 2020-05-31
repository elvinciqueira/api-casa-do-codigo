import ICreateBooksDTO from '../dtos/ICreateBooksDTO';
import Books from '../infra/typeorm/entities/Books';

export default interface IBooksRepository {
  create(data: ICreateBooksDTO): Promise<Books>;
  findByTitle(title: string): Promise<Books | undefined>;
  findByIsbn(ibsn: string): Promise<Books | undefined>;
  findById(id: string): Promise<Books | undefined>;
  findAllBooks(): Promise<Books[]>;
}
