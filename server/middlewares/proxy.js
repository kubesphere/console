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

const HttpProxy = require('http-proxy')
const pathToRegexp = require('path-to-regexp')
const isArray = require('lodash/isArray')
const get = require('lodash/get')
const isFunction = require('lodash/isFunction')
const streamify = require('stream-array')

module.exports = (context, options) => (ctx, next) => {
  let eventRegistered = false

  const regex = pathToRegexp(context)
  const proxy = HttpProxy.createProxyServer()

  if (!regex.test(ctx.path)) return next()

  const { events, ...httpProxyOpts } = options

  ctx.req.token = ctx.cookies.get('token')

  return new Promise((resolve, reject) => {
    if (events && typeof events === 'object' && !eventRegistered) {
      Object.entries(events).forEach(([event, handler]) => {
        proxy.on(event, handler)
      })

      eventRegistered = true
    }

    ctx.res.on('close', () => {
      reject(new Error(`Http response closed while proxying ${ctx.req.url}`))
    })

    ctx.res.on('finish', () => {
      resolve()
    })

    if (
      get(ctx, "req.headers['content-type']", '').includes(
        'multipart/form-data'
      )
    ) {
      httpProxyOpts.buffer = isArray(ctx.req.rawBody)
        ? streamify(ctx.req.rawBody)
        : ctx.req.rawBody
    }

    if (isFunction(httpProxyOpts.optionsHandle)) {
      httpProxyOpts.optionsHandle(httpProxyOpts, ctx.req)
    }

    proxy.web(ctx.req, ctx.res, httpProxyOpts, e => {
      console.error(e)
      const status = {
        ECONNREFUSED: 503,
        ETIMEOUT: 504,
      }[e.code]
      ctx.status = status || 500
      resolve()
    })
  })
}
