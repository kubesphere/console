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
const SvgCaptchaFactory = require('svg-captcha')

const { login, oAuthLogin } = require('../services/session')
const { renderLogin } = require('./view')
const {
  isValidReferer,
  isAppsRoute,
  decryptPassword,
} = require('../libs/utils')

const handleLogin = async ctx => {
  const params = ctx.request.body

  let referer = ctx.cookies.get('referer')
  referer = referer ? decodeURIComponent(referer) : ''

  const error = {}
  let user = null

  if (!ctx.session.errorCount) {
    ctx.session.errorCount = 0
  }

  if (isEmpty(params) || !params.username || !params.encrypt) {
    Object.assign(error, {
      status: 400,
      reason: 'Invalid Login Params',
      message: 'invalid login params',
    })
  } else if (ctx.session.errorCount > 2) {
    if (
      !ctx.session.captcha ||
      (params.captcha || '').toLowerCase() !==
        ctx.session.captcha.text.toLowerCase()
    ) {
      Object.assign(error, {
        status: 400,
        reason: 'Captcha Not Match',
        message: 'Please input the correct captcha',
      })
    }
  }

  if (isEmpty(error)) {
    try {
      params.password = decryptPassword(params.encrypt, ctx.session.salt)

      user = await login(params, { 'x-client-ip': ctx.request.ip })
      if (!user) {
        Object.assign(error, {
          status: 400,
          reason: 'Internal Server Error',
          message: 'Wrong username or password, please try again',
        })
      }
    } catch (err) {
      ctx.app.emit('error', err)

      switch (err.code) {
        case 401:
          ctx.session.errorCount += 1
          Object.assign(error, {
            status: err.code,
            reason: 'User Not Match',
            message: 'Wrong username or password, please try again',
          })
          break
        case 429:
          Object.assign(error, {
            status: err.code,
            reason: 'Too Many Requests',
            message: 'Too many failed login attempts, please wait!',
          })
          break
        case 502:
          Object.assign(error, {
            status: err.code,
            reason: 'Internal Server Error',
            message: 'Unable to access the backend services',
          })
          break
        case 'ETIMEDOUT':
          Object.assign(error, {
            status: 400,
            reason: 'Internal Server Error',
            message: 'Unable to access the api server',
          })
          break
        default:
          Object.assign(error, {
            status: err.code,
            reason: err.statusText,
            message: err.message,
          })
      }
    }
  }

  if (!isEmpty(error) || !user) {
    ctx.session.captcha = SvgCaptchaFactory.create({
      size: 5,
      noise: 1,
    })

    ctx.request.error = error
    return await renderLogin(ctx)
  }

  const lastUser = ctx.cookies.get('currentUser')

  ctx.session = {}
  ctx.cookies.set('token', user.token)
  ctx.cookies.set('expire', user.expire)
  ctx.cookies.set('refreshToken', user.refreshToken)
  ctx.cookies.set('currentUser', user.username, { httpOnly: false })
  ctx.cookies.set('referer', null)

  if (lastUser && lastUser !== user.username) {
    return ctx.redirect('/')
  }

  ctx.redirect(isValidReferer(referer) ? referer : '/')
}

const handleLogout = async ctx => {
  ctx.cookies.set('token', null)
  ctx.cookies.set('expire', null)
  ctx.cookies.set('refreshToken', null)
  ctx.cookies.set('currentUser', null)

  const { origin = '', referer = '' } = ctx.headers
  const refererPath = referer.replace(origin, '')
  if (isAppsRoute(refererPath)) {
    ctx.redirect(refererPath)
  } else {
    ctx.redirect('/login')
  }
}

const handleOAuthLogin = async ctx => {
  let user = null
  const error = {}

  try {
    user = await oAuthLogin(ctx.query)
  } catch (err) {
    ctx.app.emit('error', err)
    Object.assign(error, {
      status: err.code,
      reason: err.statusText,
      message: err.message,
    })
  }

  if (!isEmpty(error) || !user) {
    ctx.body = error.message
    return
  }

  ctx.cookies.set('token', user.token)
  ctx.cookies.set('currentUser', user.username)

  ctx.body = `<script>self.close();</script>`
}

module.exports = {
  handleLogin,
  handleLogout,
  handleOAuthLogin,
}
