import { getRepository, Repository } from 'typeorm';

import IAuthorsRepository from '@modules/authors/repositories/IAuthorsRepository';
import Authors from '@modules/authors/infra/typeorm/entities/Authors';
import ICreateAuthorDTO from '@modules/authors/dtos/ICreateAuthorDTO';

export default class AuthorsRepository implements IAuthorsRepository {
  private ormRepository: Repository<Authors>;

  constructor() {
    this.ormRepository = getRepository(Authors);
  }

  public async create({
    name,
    email,
    description,
  }: ICreateAuthorDTO): Promise<Authors> {
    const authors = this.ormRepository.create({ name, email, description });

    await this.ormRepository.save(authors);

    return authors;
  }

  public async findByEmail(email: string): Promise<Authors | undefined> {
    const findAuthor = await this.ormRepository.findOne({ where: { email } });

    return findAuthor;
  }
}
