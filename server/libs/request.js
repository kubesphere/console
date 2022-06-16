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

const { resolve4 } = require('dns')
const https = require('https')
const omit = require('lodash/omit')
const isArray = require('lodash/isArray')
const qs = require('qs')

const request = require('./request.base')
const { getServerConfig } = require('./utils')

const { server: serverConfig } = getServerConfig()

/**
 *  gateway api request, if get logined resource, token must exists,
 * @param {options} options: { token, method, url, params }
 */
const send_gateway_request = ({
  method,
  url,
  params,
  token,
  headers = {},
  ...rest
}) => {
  const options = { headers, ...rest }

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
      'content-type': headers['content-type'] || 'application/json',
      'x-client-ip': headers['x-client-ip'],
    }
  }

  return request[method.toLowerCase()](
    `${serverConfig.apiServer.url}${url}`,
    params,
    options
  )
}

const send_dockerhub_request = ({ params, path, headers }) => {
  const httpsAgent = new https.Agent({
    lookup: (host, options, cb) => {
      resolve4(host, options, (err, addresses) => {
        if (isArray(addresses)) {
          cb(err, addresses[0], 4)
        }
      })
    },
  })

  const options = {
    headers: omit(headers, ['origin', 'content-length']),
    agent: httpsAgent,
  }
  return request['get'](`${serverConfig.dockerHubUrl}${path}`, params, options)
}

const send_harbor_request = ({ path, params }) => {
  const { isSkipTLS, ...param } = params || {}
  const url = `${path}?${qs.stringify(param)}`

  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          rejectUnauthorized: !isSkipTLS,
        },
        res => {
          let data = ''
          res.on('data', chunk => {
            data += chunk.toString()
          })

          res.on('end', () => {
            try {
              const body = JSON.parse(data)
              if (body.errors) {
                const errorMsg = body.errors[0]
                  ? body.errors[0].message
                  : 'bad response'

                if (
                  errorMsg ===
                  'validation failure list:\nq in query is required'
                ) {
                  resolve({ repository: [], project: [], chart: [] })
                } else {
                  reject({ message: errorMsg })
                }
              } else {
                resolve(body)
              }
            } catch (error) {
              reject(error)
            }
          })
        }
      )
      .on('error', error => {
        reject(error)
      })
  })
}

module.exports = {
  send_gateway_request,
  send_dockerhub_request,
  send_harbor_request,
}
