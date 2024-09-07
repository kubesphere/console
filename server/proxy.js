/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const http = require('http');

const { getServerConfig } = require('./libs/utils');

const { server: serverConfig, target, agent } = getServerConfig();

const NEED_OMIT_HEADERS = ['cookie', 'referer'];

const k8sResourceProxy = {
  target,
  changeOrigin: true,
  events: {
    proxyReq(proxyReq, req) {
      // Set authorization
      if (req.token) {
        proxyReq.setHeader('Authorization', `Bearer ${req.token}`);
      }

      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key));
    },
  },
};

const marketplaceApiProxy = {
  target,
  changeOrigin: true,
  agent,
  events: {
    proxyReq(proxyReq, req) {
      if (req.token) {
        proxyReq.setHeader('Authorization', `Bearer ${req.token}`);
      }

      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key));
    },
  },
  optionsHandle(options, req) {
    req.url = req.url.replace(/^\/apis\//, '/');
  },
};

const devopsWebhookProxy = {
  target: `${serverConfig.apiServer.url}/kapis/devops.kubesphere.io/v1alpha2`,
  changeOrigin: true,
  ignorePath: true,
  optionsHandle(options, req) {
    options.target += `/${req.url.slice(8)}`;
  },
};

const b2iFileProxy = {
  target,
  changeOrigin: true,
  ignorePath: true,
  selfHandleResponse: true,
  optionsHandle(options, req) {
    options.target += `/${req.url.slice(14)}`;
  },
  events: {
    proxyReq(proxyReq, req) {
      proxyReq.setHeader('Authorization', `Bearer ${req.token}`);

      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key));
    },
    proxyRes(proxyRes, req, client_res) {
      let body = [];
      proxyRes.on('data', chunk => {
        body.push(chunk);
      });
      proxyRes.on('end', () => {
        const redirectUrl = proxyRes.headers.location;
        if (!redirectUrl) {
          body = Buffer.concat(body).toString();
          client_res.writeHead(500, proxyRes.headers);
          client_res.end(body);
          console.error(`get b2i file failed, message: ${body}`);
        }
        const proxy = http.get(proxyRes.headers.location, res => {
          client_res.writeHead(res.statusCode, res.headers);
          res.pipe(client_res, { end: true });
        });
        client_res.pipe(proxy, { end: true });
      });
    },
  },
};

const staticFileProxy = {
  target,
  changeOrigin: true,
  ignorePath: true,
  selfHandleResponse: true,
  optionsHandle(options, req) {
    options.target += `${req.url.slice(6)}`;
  },
  events: {
    proxyReq(proxyReq, req) {
      if (req.method === 'POST') {
        if (req.token) {
          proxyReq.setHeader('Authorization', `Bearer ${req.token}`);
        }
      }
      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key));
    },
    proxyRes(proxyRes, req, client_res) {
      let body = [];
      proxyRes.on('data', chunk => {
        body.push(chunk);
      });
      proxyRes.on('end', () => {
        const contentType = proxyRes.headers['content-type'];
        const headers = { ...proxyRes.headers };

        if (contentType === 'application/json') {
          body = Buffer.concat(body).toString();
          client_res.writeHead(200, proxyRes.headers);
          client_res.end(body);
        } else {
          const { path } = proxyRes.req;
          // for get svg file
          if (proxyRes.headers['content-type'].indexOf('text') !== -1) {
            headers['content-type'] = 'image/svg+xml';
          }

          http.get(`${serverConfig.apiServer.url}${path}`, res => {
            client_res.writeHead(res.statusCode, headers);
            res.pipe(client_res, { end: true });
          });
        }
      });
    },
  },
};

const oauthProxy = {
  target,
  changeOrigin: true,
  optionsHandle(options, req, ctx) {
    ctx.cookies.set('authAuthorizeUrl', req.url);
  },
  events: {
    proxyReq(proxyReq, req) {
      if (req.token) {
        proxyReq.setHeader('Authorization', `Bearer ${req.token}`);
      }

      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key));
    },
  },
};

module.exports = {
  k8sResourceProxy,
  marketplaceApiProxy,
  devopsWebhookProxy,
  b2iFileProxy,
  staticFileProxy,
  oauthProxy,
};
