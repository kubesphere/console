/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const logger = require('koa-logger');
const dayjs = require('dayjs');

module.exports = function (app) {
  if (!global.MODE_DEV) {
    app.use(
      logger(str => {
        /* eslint-disable no-console */
        console.log(str, dayjs().format('YYYY/MM/DDTHH:mm:ss.SSS'));
      }),
    );
  }
};
