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

const fs = require('fs')
const yaml = require('js-yaml/dist/js-yaml')
const {
  send_dockerhub_request,
  send_gateway_request,
} = require('../libs/request')
const { get, isArray, fromPairs } = require('lodash')
const { getCache, root } = require('../libs/utils')
const omit = require('lodash/omit')

const NEED_OMIT_HEADERS = ['cookie', 'referer', 'host']
const cache = getCache()

const handleSampleData = async ctx => {
  const sampleName = ctx.params.app

  let resources = cache.get(sampleName)
  if (!resources) {
    try {
      resources = yaml.safeLoadAll(
        fs.readFileSync(root(`server/sample/${sampleName}.yaml`)),
        'utf8'
      )
      cache.set(sampleName, resources)
    } catch (error) {
      console.error(error)
    }
  }

  ctx.body = resources
}

const handleDockerhubProxy = async ctx => {
  const data = ctx.request.body || {}
  const headers = ctx.request.headers
  ctx.body = await send_dockerhub_request({
    params: data,
    path: ctx.url.slice(10),
    headers: omit(headers, NEED_OMIT_HEADERS),
  })
}

const getS2iStatus = async (name, namespace, ctx) => {
  const result = await send_gateway_request({
    method: 'GET',
    url: `/apis/devops.kubesphere.io/v1alpha1/namespaces/${namespace}/s2ibuilders/${name}`,
    token: ctx.cookies.get('token'),
    headers: ctx.headers,
  })

  return [name, get(result, 'status.lastRunState', '')]
}

const handleGetS2iStatus = async ctx => {
  const data = ctx.request.query || {}
  const names = isArray(data.names) ? data.names : [data.names]
  const { namespace } = ctx.params
  const promises = []
  names.forEach(name => {
    promises.push(getS2iStatus(name, namespace, ctx))
  })
  await Promise.all(promises)
    .then(result => {
      ctx.body = fromPairs(result)
    })
    .catch(error => {
      ctx.body = { error: JSON.stringify(error) }
    })
}

module.exports = {
  handleSampleData,
  handleDockerhubProxy,
  handleGetS2iStatus,
}
