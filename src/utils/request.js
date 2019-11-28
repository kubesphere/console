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

require('whatwg-fetch')
const isEmpty = require('lodash/isEmpty')
const get = require('lodash/get')
const set = require('lodash/set')
const merge = require('lodash/merge')
const qs = require('qs')

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

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
    [method.toLowerCase()]: (url, params = {}, options, reject) =>
      buildRequest({ method, url, params, options, reject }),
  }),
  {
    defaults: buildRequest,
    toQueryString,
  }
)

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param config
 */
function buildRequest({
  method = 'GET',
  url,
  params = {},
  options,
  reject,
  handler,
}) {
  let requestURL = createURL(url)
  const request = merge(
    {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'content-type':
          method === 'PATCH'
            ? 'application/merge-patch+json'
            : 'application/json',
      },
    },
    options
  )

  const isForm =
    get(options, 'headers[content-type]', '').indexOf(
      'application/x-www-form-urlencoded'
    ) !== -1

  if (method === 'GET') {
    requestURL += !isEmpty(params) ? toQueryString(omitNil(params)) : ''
  } else if (isForm) {
    request.body = qs.stringify(params)
  } else {
    if (method === 'POST' && params.metadata) {
      set(
        params,
        'metadata.annotations["kubesphere.io/creator"]',
        globals.user.username
      )
    }
    request.body = JSON.stringify(params)
  }

  let responseHandler = handleResponse

  if (typeof handler === 'function') {
    responseHandler = handler
  }

  return fetch(requestURL, request).then(resp => responseHandler(resp, reject))
}
/**
 * Prepend host of API server
 * @param path
 * @returns {String}
 * @private
 */
function createURL(path) {
  if (path.startsWith('http')) {
    return path
  }

  return `/${path.trimLeft('/')}`
}

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
function handleResponse(response, reject) {
  const redirect = response.redirected
  if (redirect) {
    window.location.replace(response.url)
    return Promise.reject()
  }

  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('json')) {
    return response.json().then(data => {
      if (response.status === 403) {
        console.warn('Unauthorized', response, response.ok)
      }

      if (response.ok && response.status >= 200 && response.status < 400) {
        return data
      }

      const error = formatError(response, data)

      if (typeof reject === 'function') {
        return reject(error, response)
      } else if (window.onunhandledrejection) {
        window.onunhandledrejection(error)
      }

      return Promise.reject(error)
    })
  }

  if (response.status === 200 || response.status === 204) {
    return response.text()
  }

  return response.text().then(text => {
    const error = {
      status: response.status,
      reason: response.statusText,
      message: text,
    }

    if (typeof reject === 'function') {
      return reject(response, error)
    } else if (window.onunhandledrejection) {
      window.onunhandledrejection(error)
    }

    return Promise.reject(error)
  })
}

/**
 * Transform an JSON object to a query string
 * @param params
 * @returns {string}
 */
function toQueryString(params) {
  return `?${Object.keys(params)
    .map(k => {
      const name = encodeURIComponent(k)
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${name}=${encodeURIComponent(val)}`)
          .join('&')
      }
      if (k === 'q') {
        return `${name}=${params[k]}`
      }
      return `${name}=${encodeURIComponent(params[k])}`
    })
    .join('&')}`
}

function omitNil(obj) {
  if (typeof obj !== 'object') return obj
  return Object.keys(obj).reduce((acc, v) => {
    if (obj[v] !== undefined) acc[v] = obj[v]
    return acc
  }, {})
}

function formatError(response, data) {
  if (data.code < 100) {
    data.code = 500
  }

  const result = {
    status: response.status,
    reason: response.statusText,
  }

  if (typeof data.code === 'number') {
    result.status = data.code
  }

  if (data.status) {
    result.status = data.status
  }

  if (data.reason || data.error) {
    result.reason = data.reason || data.error
  }

  result.message = data.message || data.Error || JSON.stringify(data.details)

  return result
}
