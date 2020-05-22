import { getRepository } from 'typeorm';

import Authors from '../models/Authors';
import AppError from '../errors/AppError';

interface IRequest {
  name: string;
  email: string;
  description: string;
}

class CreateAuthorsService {
  public async execute({
    name,
    email,
    description,
  }: IRequest): Promise<Authors> {
    const authorsRepository = getRepository(Authors);

    const checkAuthorExists = await authorsRepository.findOne({
      where: { email },
    });

    if (checkAuthorExists) {
      throw new AppError('Email already registered', 400);
    }

    const authors = await authorsRepository.create({
      name,
      email,
      description,
    });

    await authorsRepository.save(authors);

    return authors;
  }
}

export default CreateAuthorsService;
