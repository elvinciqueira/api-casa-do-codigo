import { container } from 'tsyringe';

import IAuthorsRepository from '@modules/authors/repositories/IAuthorsRepository';
import AuthorsRepository from '@modules/authors/infra/typeorm/repositories/AuthorsRepository';

container.registerSingleton<IAuthorsRepository>(
  'AuthorsRepository',
  AuthorsRepository,
);
