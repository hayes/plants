import fs from 'fs';
import { generate } from '@graphql-codegen/cli';
import schema from '../src/server/schema';
import { printSchema } from 'graphql';

export async function generateSchemaAndTypes() {
  fs.writeFileSync('./schema.graphql', printSchema(schema));

  return Promise.all([
    generate(
      {
        schema: './schema.graphql',
        documents: './src/client/**/*.graphql',
        generates: {
          ['./src/client/graphql.ts']: {
            plugins: [
              'typescript',
              'typescript-operations',
              {
                add: '/* eslint-disable */',
              },
            ],
          },
        },
      },
      true,
    ),

    generate(
      {
        schema: './schema.graphql',
        documents: './src/client/**/*.graphql',
        generates: {
          ['./src/types/graphql.d.ts']: {
            plugins: [
              'typescript-graphql-files-modules',
              {
                add: '/* eslint-disable */',
              },
            ],
          },
        },
      },
      true,
    ),
  ]);
}

generateSchemaAndTypes();
