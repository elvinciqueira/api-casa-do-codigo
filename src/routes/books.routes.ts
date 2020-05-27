import { Router } from 'express';

import CreateBooksController from '../controllers/CreateBooksController';
import ShowBooksDetailController from '../controllers/ShowBooksDetailController';

import validateBooksCreate from '../validators/BooksCreate';

const booksRouter = Router();
const booksController = new CreateBooksController();
const showBooksController = new ShowBooksDetailController();

booksRouter.post('/', validateBooksCreate, booksController.create);
booksRouter.get('/', booksController.index);

booksRouter.get('/:id', showBooksController.show);

export default booksRouter;
