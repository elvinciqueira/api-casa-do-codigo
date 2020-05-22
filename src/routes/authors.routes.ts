import { Router } from 'express';

import CreateAuthorController from '../controllers/CreateAuthorsController';

const authorsRouter = Router();
const authorController = new CreateAuthorController();

authorsRouter.post('/', authorController.create);

export default authorsRouter;
