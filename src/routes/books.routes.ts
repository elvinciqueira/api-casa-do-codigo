import { Router } from 'express';

import CreateBooksController from '../controllers/CreateBooksController';

// import validateCategoryCreate from '../validators/CategoryCreate';

const booksRouter = Router();
const booksController = new CreateBooksController();

booksRouter.post('/', booksController.create);

export default booksRouter;
