/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const Router = require('koa-router');
const RouterProxy = require('koa-router-proxy');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');

const proxy = require('./middlewares/proxy');
const checkToken = require('./middlewares/checkToken');
const checkIfExist = require('./middlewares/checkIfExist');
const checkForbiddenError = require('./middlewares/checkForbiddenError');

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

const { handleSampleData } = require('./controllers/api');

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
  .get('/blank_md', renderMarkdown)

  .all('/proxy-api/(.*)', checkToken, checkForbiddenError, checkIfExist)
  .all('(/clusters/[^/]*)?/(k?)api(s?)/(.*)', checkToken, checkForbiddenError, checkIfExist)
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
