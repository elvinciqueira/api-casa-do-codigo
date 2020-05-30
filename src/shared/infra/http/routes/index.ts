import { Router } from 'express';

import authorsRouter from '@modules/authors/infra/http/routes/authors.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import booksRouter from '@modules/books/infra/http/routes/books.routes';

const routes = Router();

routes.use('/authors', authorsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/books', booksRouter);

export default routes;
