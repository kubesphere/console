/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const qs = require('qs');
const compress = require('koa-compress');
const mount = require('koa-mount');
const render = require('koa-ejs');
const serve = require('koa-static');
const fs = require('fs-extra');
const path = require('path');
const compression = require('compression');
const c2k = require('koa-connect');

const { getServerConfig, root, cwdResolve } = require('../libs/utils');

const serverConfig = getServerConfig().server;

const shouldCompress = (req, res) => {
  const url = req.url;
  const [, query] = url.split('?');
  const queryParams = qs.parse(query);
  const responseContentType = res.getHeader('Content-Type');
  const isFollow = queryParams.follow === 'true' && responseContentType === 'text/plain';

  return !isFollow;
};

module.exports = function (app) {
  // compress middleware
  app.use(
    compress({
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH,
      br: false,
    }),
  );

  // For compatibility with http-proxy
  // because http-proxy can only be code with connect's req res method
  app.use(c2k(compression({ filter: shouldCompress })));

  // serve static files
  const httpStatic = serverConfig.http.static[process.env.NODE_ENV];
  for (const [k, v] of Object.entries(httpStatic)) {
    app.use(mount(k, serve(cwdResolve(v), { index: false, maxage: 604800000 })));
  }

  if (!global.MODE_DEV) {
    app.use(async (ctx, next) => {
      // If the resource for version 4.0 does not exist, redirect to version 3.x
      if (
        /^\/assets(\/[a-zA-Z-0-9_]+)+\.(svg|png|jpg|ico)$/.test(ctx.url) &&
        !fs.pathExistsSync(path.join('dist', ctx.url)) &&
        fs.pathExistsSync(path.join('dist', 'v3dist', ctx.url))
      ) {
        ctx.redirect(`/dist/v3dist${ctx.url}`);
      } else {
        await next();
      }
    });
  }
  if (global.MODE_DEV) {
    app.use(async (ctx, next) => {
      if (
        (/(\.hot-update\.)|(\.(ttf|otf|eot|woff2?)(\?.+)?$)|(\.js$)/.test(ctx.url) &&
          !ctx.url.startsWith('/api')) ||
        /\/locales\/[a-z]+\.json$/.test(ctx.url) ||
        /\/assets\/[a-zA-Z-0-9_]+\.(svg|png|jpg|ico)$/.test(ctx.url)
      ) {
        ctx.redirect(`http://${ctx.hostname}:8001${ctx.url}`);
      } else {
        await next();
      }
    });
  }

  render(app, {
    root: root('views'),
    cache: !global.MODE_DEV,
    layout: false,
  });
};
