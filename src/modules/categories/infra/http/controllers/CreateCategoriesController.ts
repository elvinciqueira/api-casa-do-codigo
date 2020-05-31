import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCategoriesService from '@modules/categories/services/CreateCategoriesService';

export default class CreateCategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategories = container.resolve(CreateCategoriesService);

    const categories = await createCategories.execute({ name });

    return response.json(categories);
  }
}
