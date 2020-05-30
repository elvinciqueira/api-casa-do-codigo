import { Router } from 'express';

import CreateCategoriesController from '../controllers/CreateCategoriesController';

import validateCategoryCreate from '../validators/CategoryCreate';

const categoriesRouter = Router();
const categoryController = new CreateCategoriesController();

categoriesRouter.post('/', validateCategoryCreate, categoryController.create);

export default categoriesRouter;
