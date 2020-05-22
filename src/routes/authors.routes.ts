import { Router } from 'express';

import CreateAuthorsService from '../services/CreateAuthorsService';

const authorsRouter = Router();

authorsRouter.post('/', async (request, response) => {
  const { name, email, description } = request.body;

  const createAuthors = new CreateAuthorsService();

  const authors = await createAuthors.execute({
    name,
    email,
    description,
  });

  return response.json(authors);
});

export default authorsRouter;
