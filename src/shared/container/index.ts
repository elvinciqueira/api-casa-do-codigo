import { container } from 'tsyringe';

import IAuthorsRepository from '@modules/authors/repositories/IAuthorsRepository';
import AuthorsRepository from '@modules/authors/infra/typeorm/repositories/AuthorsRepository';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository';

container.registerSingleton<IAuthorsRepository>(
  'AuthorsRepository',
  AuthorsRepository,
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);
