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
const omit = require('lodash/omit')
const { send_dockerhub_request } = require('../libs/request')
const { getCache, root } = require('../libs/utils')

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

module.exports = {
  handleSampleData,
  handleDockerhubProxy,
}
