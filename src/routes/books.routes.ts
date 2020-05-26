import { Router } from 'express';

import CreateBooksController from '../controllers/CreateBooksController';

// import validateCategoryCreate from '../validators/CategoryCreate';

const booksRouter = Router();
const categoryController = new CreateBooksController();

booksRouter.post('/', categoryController.create);

export default booksRouter;
