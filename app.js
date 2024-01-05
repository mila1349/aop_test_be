import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Knex from 'knex';
import Router from 'koa-router';
import { Model } from 'objection';
import errorHandler from './middleware/errorHandler.js';
import UserRoutes from './routes/users.routes.js';
import JobRoutes from './routes/jobs.routes.js';
import cors from '@koa/cors'

import knexConfig from './knexfile.js';
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = new Koa();

app.use(bodyParser());
app.use(errorHandler);
app.use(cors());

const apiRouter = new Router({ prefix: '/api' });
apiRouter.use(UserRoutes.routes()).use(UserRoutes.allowedMethods());
apiRouter.use(JobRoutes.routes()).use(JobRoutes.allowedMethods());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
