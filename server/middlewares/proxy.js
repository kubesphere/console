/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const HttpProxy = require('http-proxy');
const pathToRegexp = require('path-to-regexp');
const isArray = require('lodash/isArray');
const get = require('lodash/get');
const isFunction = require('lodash/isFunction');
const streamify = require('stream-array');

module.exports = (context, options) => (ctx, next) => {
  let eventRegistered = false;

  const regex = pathToRegexp(context);

  if (!regex.test(ctx.path)) return next();

  ctx.req.token = ctx.cookies.get('token');

  const { events, ...httpProxyOpts } = options;

  const proxy = HttpProxy.createProxyServer();

  return new Promise((resolve, reject) => {
    if (events && typeof events === 'object' && !eventRegistered) {
      Object.entries(events).forEach(([event, handler]) => {
        proxy.on(event, handler);
      });

      eventRegistered = true;
    }

    ctx.res.on('close', () => {
      reject(new Error(`Http response closed while proxying ${ctx.req.url}`));
    });

    ctx.res.on('finish', () => {
      resolve();
    });

    if (get(ctx, "req.headers['content-type']", '').includes('multipart/form-data')) {
      httpProxyOpts.buffer = isArray(ctx.req.rawBody)
        ? streamify(ctx.req.rawBody)
        : ctx.req.rawBody;
    }

    if (isFunction(httpProxyOpts.optionsHandle)) {
      httpProxyOpts.optionsHandle(httpProxyOpts, ctx.req, ctx);
    }

    if (ctx.req.url?.startsWith('/proxy-api/')) {
      ctx.req.url = ctx.req.url.slice(10);
    }

    proxy.web(ctx.req, ctx.res, httpProxyOpts, e => {
      console.error(e);
      const status = {
        ECONNREFUSED: 503,
        ETIMEOUT: 504,
      }[e.code];
      ctx.status = status || 500;
      resolve();
    });
  });
};
