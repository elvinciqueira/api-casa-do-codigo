import { Router } from 'express';

import CreateBooksController from '../controllers/CreateBooksController';

import validateBooksCreate from '../validators/BooksCreate';

const booksRouter = Router();
const booksController = new CreateBooksController();

booksRouter.post('/', validateBooksCreate, booksController.create);
booksRouter.get('/', booksController.index);

export default booksRouter;
