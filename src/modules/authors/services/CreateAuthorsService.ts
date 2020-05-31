import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Authors from '../infra/typeorm/entities/Authors';
import IAuthorsRepository from '../repositories/IAuthorsRepository';

interface IRequest {
  name: string;
  email: string;
  description: string;
}

@injectable()
class CreateAuthorsService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) { }

  public async execute({
    name,
    email,
    description,
  }: IRequest): Promise<Authors> {
    const checkAuthorExists = await this.authorsRepository.findByEmail(email);

    if (checkAuthorExists) {
      throw new AppError('Email already registered', 400);
    }

    const authors = await this.authorsRepository.create({
      name,
      email,
      description,
    });

    return authors;
  }
}

export default CreateAuthorsService;
