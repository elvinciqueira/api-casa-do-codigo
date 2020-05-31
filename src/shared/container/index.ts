import { container } from 'tsyringe';

import IAuthorsRepository from '@modules/authors/repositories/IAuthorsRepository';
import AuthorsRepository from '@modules/authors/infra/typeorm/repositories/AuthorsRepository';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<IAuthorsRepository>(
  'AuthorsRepository',
  AuthorsRepository,
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
