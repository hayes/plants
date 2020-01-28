import SchemaBuilder from '@giraphql/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const builder = new SchemaBuilder();
const Query = builder.createQueryType({
  shape: t => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name ?? 'World!'}`,
    }),
  }),
});

const schema = builder.toSchema([Query]);

const app = express();

const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });

export default app;
