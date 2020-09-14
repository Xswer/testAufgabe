require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
import express from 'express';
import 'express-async-errors';
import { errorHandler } from '@xsstore/common';
import { NotFoundError } from '@xsstore/common';
import { graphqlHTTP } from 'express-graphql';
import { firmaSchema } from './gqlSchema/firmaSchema';
const app = express();

app.use(express.json());
app.use(async (req, res, next) => {
  console.log(req.method, req.url, '\n', req.body);
  await next();
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: firmaSchema,
    graphiql: true,
  }),
);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
