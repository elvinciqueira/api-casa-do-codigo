import { Router } from 'express';

import authorsRouter from './authors.routes';

const routes = Router();

routes.use('/authors', authorsRouter);

export default routes;
