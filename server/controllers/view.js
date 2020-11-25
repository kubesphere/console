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

const uid = require('uid-safe')
const SvgCaptchaFactory = require('svg-captcha')
const { getCurrentUser, getOAuthInfo } = require('../services/session')

const {
  getServerConfig,
  getManifest,
  isValidReferer,
} = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const renderView = async ctx => {
  try {
    const manifest = getManifest()
    const { user, config, ksConfig } = await getCurrentUser(ctx)

    await ctx.render('index', {
      isDev: global.MODE_DEV,
      title: config.title,
      config: JSON.stringify(config),
      ksConfig: JSON.stringify(ksConfig),
      user: JSON.stringify(user),
      manifest,
    })
  } catch (err) {
    if (err) {
      if (err.code === 401 || err.status === 401) {
        if (isValidReferer(ctx.path)) {
          ctx.redirect(`/login?referer=${ctx.path}`)
        } else {
          ctx.redirect('/login')
        }
      } else if (err.code === 502) {
        await ctx.render('error', {
          title: clientConfig.title,
          t: ctx.t.bind(ctx),
          message: 'Unable to access the backend services',
        })
      } else if (err.code === 'ETIMEDOUT') {
        await ctx.render('error', {
          title: clientConfig.title,
          t: ctx.t.bind(ctx),
          message: 'Unable to access the api server',
        })
      } else {
        ctx.app.emit('error', err)
      }
    } else {
      await ctx.render('error', {
        title: clientConfig.title,
        t: ctx.t.bind(ctx),
      })
    }
  }
}

const renderLogin = async ctx => {
  let loginPath = '/login'

  if (isValidReferer(ctx.query.referer)) {
    loginPath += `?referer=${ctx.query.referer}`
  }

  ctx.cookies.set('referer', ctx.query.referer)

  ctx.session.salt = uid.sync(12)

  const oauthServers = await getOAuthInfo(ctx)

  await ctx.render('login', {
    loginPath,
    oauthServers: oauthServers || [],
    title: clientConfig.title,
    error: ctx.request.error,
    errorCount: ctx.session.errorCount || 0,
    salt: ctx.session.salt,
    t: ctx.t.bind(ctx),
  })
}

const renderMarkdown = async ctx => {
  await ctx.render('blank_markdown')
}

const renderCaptcha = async ctx => {
  if (ctx.query.refresh) {
    ctx.session.captcha = SvgCaptchaFactory.create({
      size: 5,
      noise: 1,
    })
  }

  ctx.type = 'svg'
  ctx.status = 200

  ctx.body = ctx.session.captcha.data
}

module.exports = {
  renderView,
  renderLogin,
  renderMarkdown,
  renderCaptcha,
}
