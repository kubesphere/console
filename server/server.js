/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const Koa = require('koa');
const path = require('path');

Koa.prototype.apply = function (module, ...rest) {
  module(this, ...rest);
  return this;
};

global.MODE_DEV = process.env.NODE_ENV === 'development';
global.APP_ROOT = path.resolve(__dirname, '../');
global.SERVER_ROOT = path.resolve(__dirname, './');

const { getServerConfig } = require('./libs/utils');
const boot = require('./components/boot');
const locale = require('./components/locale');
const logging = require('./components/logging');
const wsProxy = require('./components/wsProxy');
const errorProcess = require('./components/errorProcess');
const routes = require('./routes');

const app = new Koa();

const serverConfig = getServerConfig().server;

global.HOSTNAME = serverConfig.http.hostname || 'localhost';
global.PORT = serverConfig.http.port || 8000;

app.keys = ['kubesphere->_<'];

app.apply(boot).apply(locale).apply(logging).apply(errorProcess).use(routes.routes());

app.server = app.listen(global.PORT, err => {
  if (err) {
    return console.error(err);
  }
  /* eslint-disable no-console */
  console.log(`Dashboard app running at port ${global.PORT}`);
});

app.apply(wsProxy);

const shutdown = () => {
  console.log('Received shutdown signal. Starting graceful shutdown...');

  // waiting for the server to shut down
  app.server.close(err => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.send('quit');
      process.exit(1);
    }
    console.log('Server closed successfully.');
    process.send('quit');
    process.exit(0);
  });

  // If shutdown times out, force quit
  setTimeout(() => {
    console.log('Force quitting due to shutdown timeout.');
    process.send('quit');
    process.exit(1);
  }, 5000);
};
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  process.on('SIGINT', () => {
    console.log('\nSIGINT signal received.');
    shutdown();
  });
  // Capturing the termination signal
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    shutdown();
  });
}
