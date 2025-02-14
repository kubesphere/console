/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const fetch = require('node-fetch').default;
const merge = require('lodash/merge');
const isEmpty = require('lodash/isEmpty');
const qs = require('qs');
const { get } = require('lodash');
const http = require('http');
const https = require('https');

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const omitErrorPath = ['/configs/theme'];

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
function handleResponse(response) {
  const redirect = response.redirected;
  if (redirect) {
    return Promise.reject();
  }

  if (response.status === 302) {
    return response;
  }

  const contentType = response.headers.get('content-type');

  if (response.status === 404 && omitErrorPath.some(path => response.url.indexOf(path) !== -1)) {
    return {};
  }

  if (contentType && contentType.includes('json')) {
    return response.json().then(res => {
      if (response.status === 401) {
        console.warn('Unauthorized', response, response.ok);
      }

      if (response.ok && response.status >= 200 && response.status < 400) {
        return res;
      }

      return Promise.reject({
        code: response.status,
        ...res,
        statusText: response.statusText,
      });
    });
  }

  if (response.status === 200 || response.status === 204) {
    return response.text();
  }

  return response.text().then(text =>
    Promise.reject({
      code: response.status,
      statusText: response.statusText,
      message: text,
    }),
  );
}

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param config
 */
function buildRequest(method, url, params = {}, options) {
  let requestURL = url;
  const request = merge(
    {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      agent: ({ protocol }) => {
        if (protocol === 'http:') {
          return new http.Agent({ rejectUnauthorized: false });
        }

        return new https.Agent({ rejectUnauthorized: false });
      },
      followRedirect: false,
    },
    options,
  );

  const isForm =
    get(options, 'headers[content-type]', '').indexOf('application/x-www-form-urlencoded') !== -1;

  if (method === 'GET') {
    if (!isEmpty(params)) {
      requestURL += `?${qs.stringify(params)}`;
    }
  } else if (isForm) {
    request.body = qs.stringify(params);
  } else {
    request.body = JSON.stringify(params);
  }

  return fetch(requestURL, request).then(handleResponse);
}

/**
 * This is our overly complicated isomorphic "request",
 * methods: get, post, put, patch, delete
 * @param url
 * @param params
 * @param options
 * @param reject
 * @returns {Function}
 */
module.exports = methods.reduce(
  (prev, method) => ({
    ...prev,
    [method.toLowerCase()]: (...args) => buildRequest(method, ...args),
  }),
  {},
);
