import { Request, Response } from 'express';

import CreateCategoriesService from '../services/CreateCategoriesService';

export default class CreateCategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategories = new CreateCategoriesService();

    const categories = await createCategories.execute({ name });

    return response.json(categories);
  }
}
