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

const isEmpty = require('lodash/isEmpty')
const isUndefined = require('lodash/isUndefined')
const { send_gateway_request } = require('../libs/request')

module.exports = async (ctx, next) => {
  if (ctx.headers['x-check-exist']) {
    try {
      ctx.body = await send_gateway_request({
        method: ctx.method,
        headers: ctx.headers,
        url: ctx.url,
        token: ctx.cookies.get('token'),
      })

      ctx.status = 200

      // custom api rules
      if (!isUndefined(ctx.body.items)) {
        ctx.body = { exist: !isEmpty(ctx.body.items) }
        return
      }

      if (!isUndefined(ctx.body.total)) {
        ctx.body = { exist: ctx.body.total > 0 }
        return
      }

      if (!isUndefined(ctx.body.annotations)) {
        ctx.body = { exist: !!ctx.body.annotations }
        return
      }

      if (!isUndefined(ctx.body.exist)) {
        ctx.body = { exist: ctx.body.exist }
        return
      }

      ctx.body = { exist: true }
    } catch (error) {
      ctx.body = { exist: false }
    }
  } else {
    return await next()
  }
}
