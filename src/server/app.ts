import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import schema from './schema';

const app = express();

const prisma = new PrismaClient();

prisma.connect();

const server = new ApolloServer({
  schema,
  context: () => ({
    prisma,
  }),
});

server.applyMiddleware({ app });

export default app;
