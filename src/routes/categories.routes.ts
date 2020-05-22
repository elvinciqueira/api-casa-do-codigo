import { Router } from 'express';

import CreateCategoriesController from '../controllers/CreateCategoriesController';

// import validateAuthorCreate from '../validators/AuthorCreate';

const categoriesRouter = Router();
const categoryController = new CreateCategoriesController();

categoriesRouter.post('/', categoryController.create);

export default categoriesRouter;
