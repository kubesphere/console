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

const Router = require('koa-router');
const RouterProxy = require('koa-router-proxy');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');

const proxy = require('./middlewares/proxy');
const checkToken = require('./middlewares/checkToken');
const checkIfExist = require('./middlewares/checkIfExist');

const { getServerConfig } = require('./libs/utils');

const { server: serverConfig } = getServerConfig();

const {
  marketplaceApiProxy,
  k8sResourceProxy,
  devopsWebhookProxy,
  b2iFileProxy,
  staticFileProxy,
  oauthProxy,
} = require('./proxy');

const { handleSampleData, handleDockerhubProxy, handleHarborProxy } = require('./controllers/api');

const {
  handleLogin,
  handleThirdLogin,
  handleLogout,
  handleOAuthLogin,
  handleLoginConfirm,
} = require('./controllers/session');

const {
  renderView,
  renderV3View,
  renderTerminal,
  renderLogin,
  renderLoginConfirm,
  renderMarkdown,
} = require('./controllers/view');

const parseBody = convert(
  bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb',
  }),
);

const router = new Router();

router
  .use(proxy('/devops_webhook/(.*)', devopsWebhookProxy))
  .use(proxy('/b2i_download/(.*)', b2iFileProxy))
  .post('/dockerhub/(.*)', parseBody, handleDockerhubProxy)
  .post('/harbor/(.*)', parseBody, handleHarborProxy)
  .get('/blank_md', renderMarkdown)

  .all('/proxy-api/(.*)', checkToken, checkIfExist)
  .all('(/clusters/[^/]*)?/(k?)api(s?)/(.*)', checkToken, checkIfExist)
  .use(proxy('/apis/marketplace/(.*)', marketplaceApiProxy))
  .use(proxy('(/clusters/[^/]*)?/(k?)api(s?)/(.*)', k8sResourceProxy))
  .use(proxy('/proxy/(.*)', k8sResourceProxy))
  .use(proxy('/overview', k8sResourceProxy))
  .get('/sample/:app', parseBody, handleSampleData)
  .use(proxy('/proxy-api/(.*)', k8sResourceProxy))

  // session
  .post('/login', parseBody, handleLogin)
  .post('/oauth/login/:provider', parseBody, handleThirdLogin)
  .get('/login', renderLogin)
  .post('/login/confirm', parseBody, handleLoginConfirm)
  .get('/login/confirm', renderLoginConfirm)
  .get('/logout', handleLogout)
  // oauth callback
  .get('/oauth/redirect/:name', handleOAuthLogin)

  .use(proxy('/oauth/authorize', oauthProxy))
  // oidc
  .use(proxy('/oauth/(.*)', k8sResourceProxy))
  .use(proxy('/.well-known/openid-configuration', k8sResourceProxy))

  // terminal
  .get('/terminal(.*)', renderTerminal)

  // console v3
  .get('/consolev3/(.*)', renderV3View)

  // theme static image
  .use(proxy('/theme/(.*)', staticFileProxy))

  // plugin static files proxy.
  .get(
    '/pstatic/(.*)',
    RouterProxy('(.*)', {
      target: serverConfig.apiServer.url,
      changeOrigin: true,
      rewrite: path => {
        return path.replace('/pstatic', '');
      },
    }),
  )

  // page entry
  .all('(.*)', renderView);

module.exports = router;
