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

const Router = require('koa-router')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')

const proxy = require('./middlewares/proxy')
const checkIfExist = require('./middlewares/checkIfExist')

const {
  k8sResourceProxy,
  devopsWebhookProxy,
  b2iFileProxy,
} = require('./proxy')

const { handleSampleData, handleDockerhubProxy } = require('./controllers/api')

const {
  handleLogin,
  handleLogout,
  handleOAuthLogin,
} = require('./controllers/session')

const {
  renderView,
  renderLogin,
  renderMarkdown,
  renderCaptcha,
} = require('./controllers/view')

const parseBody = convert(
  bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb',
  })
)

const router = new Router()

router
  .use(proxy('/devops_webhook/(.*)', devopsWebhookProxy))
  .get('/captcha', renderCaptcha)

  .use(checkIfExist)

  .use(proxy('/(k)?api(s)?/(.*)', k8sResourceProxy))
  .use(proxy('/b2i_download/(.*)', b2iFileProxy))
  .get('/dockerhub/(.*)', parseBody, handleDockerhubProxy)

  .get('/sample/:app', parseBody, handleSampleData)

  // session
  .post('/login', parseBody, handleLogin)
  .post('/logout', handleLogout)
  .get('/login', renderLogin)

  .get('/oauth/redirect', handleOAuthLogin)

  // markdown template
  .get('/blank_md', renderMarkdown)

  // page entry
  .all('*', renderView)

module.exports = router
