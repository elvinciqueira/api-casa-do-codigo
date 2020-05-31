import { getRepository, Repository } from 'typeorm';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICreateAuthorDTO from '@modules/authors/dtos/ICreateAuthorDTO';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({ name }: ICreateAuthorDTO): Promise<Category> {
    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category);

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({ where: { name } });

    return findCategory;
  }
}
