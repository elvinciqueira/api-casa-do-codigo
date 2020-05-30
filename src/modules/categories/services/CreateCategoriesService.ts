import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';

interface IRquest {
  name: string;
}

export default class CreateCategoriesService {
  public async execute({ name }: IRquest): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const checkCategoryExists = await categoryRepository.findOne({
      where: { name },
    });

    if (checkCategoryExists) {
      throw new AppError('Category already exists', 400);
    }

    const category = categoryRepository.create({ name });

    await categoryRepository.save(category);

    return category;
  }
}
