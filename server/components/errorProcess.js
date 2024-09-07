/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const isString = require('lodash/isString');

module.exports = function (app) {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      let error = err;

      if (isString(error)) {
        error = {
          code: 500,
          status: 'Failure',
          reason: err,
        };
      }

      if (error.code < 100) {
        error.code = 500;
      }

      ctx.status = typeof error.code === 'number' ? error.code : 500;
      ctx.body = error;
      ctx.app.emit('error', error);
    }
  });

  app.on('error', err => {
    /* centralized error handling:
     *   console.error error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
     */
    console.error(err);
  });

  // catch uncaught error
  process.on('uncaughtException', err => {
    console.error(err);
    /* eslint-disable no-console */
    console.log('NOT exit...');
  });
};
