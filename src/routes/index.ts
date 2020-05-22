import { Router } from 'express';

import authorsRouter from './authors.routes';
import categoriesRouter from './categories.routes';

const routes = Router();

routes.use('/authors', authorsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
