import { Request, Response } from 'express';

import CreateAuthorsService from '@modules/authors/services/CreateAuthorsService';

export default class CreateAuthorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, description } = request.body;

    const createAuthors = new CreateAuthorsService();

    const authors = await createAuthors.execute({
      name,
      email,
      description,
    });

    return response.json(authors);
  }
}
