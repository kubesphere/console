/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const compress = require('koa-compress')
const mount = require('koa-mount')
const render = require('koa-ejs')
const serve = require('koa-static')

const { getServerConfig, root } = require('../libs/utils')

const serverConfig = getServerConfig().server

module.exports = function(app) {
  // compress middleware
  app.use(
    compress({
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH,
    })
  )

  // serve static files
  const httpStatic = serverConfig.http.static[process.env.NODE_ENV]
  for (const [k, v] of Object.entries(httpStatic)) {
    app.use(mount(k, serve(root(v), { index: false, maxage: 604800000 })))
  }

  if (global.MODE_DEV) {
    app.use(async (ctx, next) => {
      if (
        /(\.hot-update\.)|(\.(ttf|otf|eot|woff2?)(\?.+)?$)|(\.js$)/.test(
          ctx.url
        )
      ) {
        ctx.redirect(`http://${ctx.hostname}:8001${ctx.url}`)
      } else {
        await next()
      }
    })
  }

  render(app, {
    root: root('server/views'),
    cache: !global.MODE_DEV,
    layout: false,
  })
}
