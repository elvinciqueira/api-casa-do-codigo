import { Router } from 'express';

import authorsRouter from './authors.routes';
import categoriesRouter from './categories.routes';
import booksRouter from './books.routes';

const routes = Router();

routes.use('/authors', authorsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/books', booksRouter);

export default routes;
