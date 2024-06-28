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

const { resolve4 } = require('dns');
const https = require('https');
const http = require('http');
const fetch = require('node-fetch').default;
const omit = require('lodash/omit');
const isArray = require('lodash/isArray');

const request = require('./request.base');
const { getServerConfig } = require('./utils');

const { server: serverConfig } = getServerConfig();

/**
 *  gateway api request, if get logined resource, token must exists,
 * @param {options} options: { token, method, url, params }
 */
const sendGatewayRequest = ({ method, url, params, token, headers = {}, ...rest }) => {
  const options = { headers, ...rest };

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
      'content-type': headers['content-type'] || 'application/json',
      'x-client-ip': headers['x-client-ip'],
    };
  }

  return request[method.toLowerCase()](`${serverConfig.apiServer.url}${url}`, params, options);
};

const sendDockerhubRequest = ({ params, path, headers }) => {
  const httpsAgent = new https.Agent({
    lookup: (host, options, cb) => {
      resolve4(host, options, (err, addresses) => {
        if (isArray(addresses)) {
          cb(err, addresses[0], 4);
        }
      });
    },
  });

  const options = {
    headers: omit(headers, ['origin', 'content-length']),
    agent: httpsAgent,
  };
  return request.get(`${serverConfig.dockerHubUrl}${path}`, params, options);
};

const sendHarborRequest = ({ path, params }) => {
  const { isSkipTLS, protocol, auth } = params;

  const httpsAgent =
    protocol === 'https://'
      ? new https.Agent({ rejectUnauthorized: !isSkipTLS })
      : new http.Agent({ rejectUnauthorized: !isSkipTLS });

  let AuthorizationHeader = {};

  if (auth) {
    AuthorizationHeader = {
      Authorization: `Basic ${auth}`,
    };
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        ...AuthorizationHeader,
      },
      agent: httpsAgent,
      followRedirect: false,
    })
      .then(response => {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('json')) {
          return response.json().then(res => {
            if (res.errors) {
              const errorMsg = res.errors[0] ? res.errors[0].message : 'bad response';

              if (errorMsg === 'validation failure list:\nq in query is required') {
                resolve({ repository: [], project: [], chart: [] });
              }
            }

            if (response.ok && response.status >= 200 && response.status < 400) {
              resolve(res);
            }

            reject({
              code: response.status,
              ...res,
              statusText: response.statusText,
            });
          });
        }

        reject({
          code: 400,
          statusText: response.statusText,
          message: 'bad request',
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  sendGatewayRequest,
  sendDockerhubRequest,
  sendHarborRequest,
};
