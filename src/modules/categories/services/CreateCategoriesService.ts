import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRquest {
  name: string;
}

@injectable()
export default class CreateCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute({ name }: IRquest): Promise<Category> {
    const checkCategoryExists = await this.categoriesRepository.findByName(
      name,
    );

    if (checkCategoryExists) {
      throw new AppError('Category already exists', 400);
    }

    const category = await this.categoriesRepository.create({ name });

    return category;
  }
}
