import { PrismaClient } from '@prisma/client';
import SchemaBuilder from '@giraphql/core';
import ExtendsPlugin from '@giraphql/plugin-extends';
import { Plant, Note } from './types';

const builder = new SchemaBuilder<{
  Context: {
    prisma: PrismaClient;
  };
  Object: {
    Plant: Plant;
    Note: Note;
  };
}>({ stateful: true, plugins: [new ExtendsPlugin()] });

export default builder;
