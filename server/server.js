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
