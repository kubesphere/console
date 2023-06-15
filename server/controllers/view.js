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

const {
  getCurrentUser,
  getKSConfig,
  getK8sRuntime,
  getOAuthInfo,
  getClusterRole,
  getSupportGpuList,
  getGitOpsEngine,
} = require('../services/session')

const {
  getServerConfig,
  getManifest,
  getLocaleManifest,
  isValidReferer,
  safeBase64,
} = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const renderView = async ctx => {
  try {
    const clusterRole = await getClusterRole(ctx)
    const ksConfig = await getKSConfig()

    const [user, runtime, supportGpuType, gitopsEngine] = await Promise.all([
      getCurrentUser(ctx, clusterRole, ksConfig.multicluster),
      getK8sRuntime(ctx),
      getSupportGpuList(ctx),
      getGitOpsEngine(ctx),
    ])

    await renderIndex(ctx, {
      ksConfig,
      user,
      runtime,
      clusterRole,
      config: { ...clientConfig, supportGpuType, gitopsEngine },
    })
  } catch (err) {
    await renderViewErr(ctx, err)
  }
}

const renderLogin = async ctx => {
  const referer = ctx.querystring.split('referer=')[1]

  if (isValidReferer(referer)) {
    ctx.cookies.set('referer', referer)
  }

  const oauthServers = await getOAuthInfo(ctx)

  await renderIndex(ctx, {
    oauthServers: oauthServers || [],
  })
}

const renderLoginConfirm = async ctx => {
  const usrName = ctx.cookies.get('defaultUser') || ''
  await renderIndex(ctx, {
    user: {
      username: safeBase64.safeAtob(usrName),
      email: ctx.cookies.get('defaultEmail'),
    },
  })
}

const renderIndex = async (ctx, params) => {
  const manifest = getManifest('main')
  const localeManifest = getLocaleManifest()

  await ctx.render('index', {
    manifest,
    isDev: global.MODE_DEV,
    title: clientConfig.title,
    hostname: ctx.hostname,
    globals: JSON.stringify({
      config: clientConfig,
      localeManifest,
      ...params,
    }),
  })
}

const renderTerminal = async ctx => {
  try {
    const manifest = getManifest('terminalEntry')
    const [user, ksConfig, runtime] = await Promise.all([
      getCurrentUser(ctx),
      getKSConfig(),
      getK8sRuntime(ctx),
    ])
    const localeManifest = getLocaleManifest()

    await ctx.render('terminal', {
      manifest,
      isDev: global.MODE_DEV,
      title: clientConfig.title,
      hostname: ctx.hostname,
      globals: JSON.stringify({
        localeManifest,
        user,
        ksConfig,
        runtime,
      }),
    })
  } catch (err) {
    await renderViewErr(ctx, err)
  }
}

const renderMarkdown = async ctx => {
  await ctx.render('blank_markdown')
}

const renderViewErr = async (ctx, err) => {
  ctx.app.emit('error', err)
  if (err) {
    if (err.code === 401 || err.code === 403 || err.status === 401) {
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

module.exports = {
  renderView,
  renderTerminal,
  renderLogin,
  renderMarkdown,
  renderLoginConfirm,
}
