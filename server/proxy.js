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

const http = require('http')

const { getServerConfig } = require('./libs/utils')

const { server: serverConfig } = getServerConfig()

const NEED_OMIT_HEADERS = ['cookie', 'referer']

const k8sResourceProxy = {
  target: serverConfig.apiServer.url,
  changeOrigin: true,
  events: {
    proxyReq(proxyReq, req) {
      // Set authorization
      if (req.token) {
        proxyReq.setHeader('Authorization', `Bearer ${req.token}`)
      }

      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key))
    },
    proxyRes(proxyRes, req, client_res) {
      let maxBufferSize = req.headers['x-file-size-limit']
      if (maxBufferSize) {
        maxBufferSize = Number(maxBufferSize)
        let body = Buffer.alloc(maxBufferSize)
        let offset = 0
        let end = false
        proxyRes.on('data', chunk => {
          if (end) {
            return
          }
          if (offset >= maxBufferSize) {
            if (!client_res.getHeader('x-file-size-limit-out')) {
              client_res.setHeader('x-file-size-limit-out', 'true')
            }
            proxyRes.emit('end')
            end = true
            return
          }
          chunk.copy(body, offset)

          offset += chunk.length
        })
        proxyRes.pipe = function(res) {
          proxyRes.on('end', () => {
            end = true
            const offset1 = Math.min(offset, maxBufferSize)
            body = body.slice(0, offset1)
            res.writeHead(proxyRes.statusCode, {
              ...proxyRes.headers,
              'x-file-size': offset1,
            })
            res.end(body)
          })
        }
      }
      let addHeaders = req.headers['x-add-res-header']
      if (addHeaders) {
        addHeaders = JSON.parse(addHeaders)
        Object.keys(addHeaders).forEach(key => {
          proxyRes.headers[key] = addHeaders[key]
        })
      }
    },
  },
}

const devopsWebhookProxy = {
  target: `${serverConfig.apiServer.url}/kapis/devops.kubesphere.io/v1alpha2`,
  changeOrigin: true,
  ignorePath: true,
  optionsHandle(options, req) {
    options.target += `/${req.url.slice(8)}`
  },
}

const b2iFileProxy = {
  target: serverConfig.apiServer.url,
  changeOrigin: true,
  ignorePath: true,
  selfHandleResponse: true,
  optionsHandle(options, req) {
    options.target += `/${req.url.slice(14)}`
  },
  events: {
    proxyReq(proxyReq, req) {
      proxyReq.setHeader('Authorization', `Bearer ${req.token}`)

      NEED_OMIT_HEADERS.forEach(key => proxyReq.removeHeader(key))
    },
    proxyRes(proxyRes, req, client_res) {
      let body = []
      proxyRes.on('data', chunk => {
        body.push(chunk)
      })
      proxyRes.on('end', () => {
        const redirectUrl = proxyRes.headers.location
        if (!redirectUrl) {
          body = Buffer.concat(body).toString()
          client_res.writeHead(500, proxyRes.headers)
          client_res.end(body)
          console.error(`get b2i file failed, message: ${body}`)
        }
        const proxy = http.get(proxyRes.headers.location, res => {
          client_res.writeHead(res.statusCode, res.headers)
          res.pipe(client_res, { end: true })
        })
        client_res.pipe(proxy, { end: true })
      })
    },
  },
}

module.exports = {
  k8sResourceProxy,
  devopsWebhookProxy,
  b2iFileProxy,
}
