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

const fetch = require('node-fetch').default
const merge = require('lodash/merge')
const isEmpty = require('lodash/isEmpty')
const qs = require('qs')
const { get } = require('lodash')

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

/**
 * enable dnscache
 */
// eslint-disable-next-line no-unused-vars
const dnscache = require('dnscache')({
  enable: true,
  ttl: 300, // ttl in seconds for cache-entries
  cachesize: 1000, // number of cache entries, defaults to 1000
})

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
  {}
)

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param config
 */
function buildRequest(method, url, params = {}, options) {
  let requestURL = url
  const request = merge(
    {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    },
    options
  )

  const isForm =
    get(options, 'headers[content-type]', '').indexOf(
      'application/x-www-form-urlencoded'
    ) !== -1

  if (method === 'GET') {
    if (!isEmpty(params)) {
      requestURL += `?${qs.stringify(params)}`
    }
  } else if (isForm) {
    request.body = qs.stringify(params)
  } else {
    request.body = JSON.stringify(params)
  }

  return fetch(requestURL, request).then(handleResponse)
}

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
function handleResponse(response) {
  const redirect = response.redirected
  if (redirect) {
    return Promise.reject()
  }

  if (response.status === 302) {
    return response
  }

  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('json')) {
    return response.json().then(res => {
      if (response.status === 401) {
        console.warn('Unauthorized', response, response.ok)
      }

      if (response.ok && response.status >= 200 && response.status < 400) {
        return res
      }

      return Promise.reject({
        code: response.status,
        ...res,
        statusText: response.statusText,
      })
    })
  }

  if (response.status === 200 || response.status === 204) {
    return response.text()
  }

  return response.text().then(text =>
    Promise.reject({
      code: response.status,
      statusText: response.statusText,
      message: text,
    })
  )
}
