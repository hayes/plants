import express from 'express';
import chokidar from 'chokidar';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import http from 'http';
import path from 'path';
// @ts-ignore
import webpackConfig from '../webpack.config';

const devApp = express();
const compiler = webpack({
  ...webpackConfig,
  devtool: 'inline-source-map',
  mode: 'development',
});

// load initial version of app
import('../src/server/app');
import('./generate').then(({ generateSchemaAndTypes }) => {
  console.log('generating schema and types');
  generateSchemaAndTypes();
});

devApp.use(webpackMiddleware(compiler));
devApp.use(hotMiddleware(compiler));

devApp.use((req, res, next) => {
  import('../src/server/app').then(
    ({ default: app }) => {
      app(req, res, next);
    },
    err => next(err), // eslint-disable-line promise/no-callback-in-promise
  );
});

const server = http.createServer(devApp);

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch('./src/server');

watcher.on('ready', () => {
  watcher.on('all', async () => {
    path.resolve(__dirname, '../src/server');
    console.log('Clearing /src/server/ module cache from server');
    Object.keys(require.cache).forEach(id => {
      if (id.startsWith(path.resolve(__dirname, '../src/server'))) {
        delete require.cache[id];
      }
    });
    import('../src/server/app');

    console.log('re-generating schema and types');
    (await import('./generate')).generateSchemaAndTypes();
  });
});

server.listen(3000, () => {
  const address = server.address();

  if (!address || typeof address === 'string') {
    throw new Error(`Unexpected address ${address}`);
  }

  console.log(`Server started: http://127.0.0.1:${address.port}/`);
});
