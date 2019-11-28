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

const isString = require('lodash/isString')

module.exports = function(app) {
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      let error = err

      if (isString(error)) {
        error = {
          code: 500,
          status: 'Failure',
          reason: err,
        }
      }

      if (error.code < 100) {
        error.code = 500
      }

      ctx.status = typeof error.code === 'number' ? error.code : 500
      ctx.body = error
      ctx.app.emit('error', error)
    }
  })

  app.on('error', err => {
    /* centralized error handling:
     *   console.error error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
     */
    console.error(err)
  })

  // catch uncaught error
  process.on('uncaughtException', err => {
    console.error(err)
    /* eslint-disable no-console */
    console.log('NOT exit...')
  })
}
