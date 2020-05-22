import { Router } from 'express';

import CreateAuthorController from '../controllers/CreateAuthorsController';

import validateAuthorCreate from '../validators/AuthorCreate';

const authorsRouter = Router();
const authorController = new CreateAuthorController();

authorsRouter.post('/', validateAuthorCreate, authorController.create);

export default authorsRouter;
