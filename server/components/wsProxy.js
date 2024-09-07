/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const httpProxy = require('http-proxy');
const { getServerConfig } = require('../libs/utils');

const { server: serverConfig, agent } = getServerConfig();

module.exports = function (app) {
  const wsProxy = httpProxy.createProxyServer({
    ws: true,
    changeOrigin: true,
    agent,
  });

  app.server.on('upgrade', (req, socket, head) => {
    const target = serverConfig.apiServer.wsUrl;
    wsProxy.ws(req, socket, head, { target });

    wsProxy.on('proxyReqWs', (proxyReq, _req) => {
      const token = _req.headers.cookie.match(new RegExp('(?:^|;)\\s?token=(.*?)(?:;|$)', 'i'))[1];
      proxyReq.setHeader('Authorization', `Bearer ${token}`);
    });
  });
};
