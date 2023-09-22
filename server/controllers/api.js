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
const qs = require('qs')

const {
  send_dockerhub_request,
  send_harbor_request,
} = require('../libs/request')
const { getCache, root, getServerConfig } = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const NEED_OMIT_HEADERS = ['cookie', 'referer', 'host']
const { decryptPassword } = require('../libs/utils')

const cache = getCache()

const handleSampleData = async ctx => {
  const sampleName = ctx.params.app
  const isFilePath = /(\/)\1{1,}|(\.)\2{1,}/.test(sampleName)

  if (isFilePath) {
    ctx.body = 'Invalid sample name'
    return
  }

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

  const res = await send_dockerhub_request({
    params: data,
    path: ctx.url.slice(10),
    headers: omit(headers, NEED_OMIT_HEADERS),
  })

  ctx.body = res
}

const handleHarborProxy = async ctx => {
  const requestUrl = ctx.url.slice(8)
  const data = ctx.request.body
  const headers = ctx.request.headers
  const encryptKey = clientConfig.encryptKey || 'kubesphere'

  // Check for relative and absolute paths
  const pathRule = /^(\/)\1{1,}|(\.)\2{1,}/
  let path = ''

  if (!data.harborData) {
    ctx.throw(400, 'Invalid post data')
  }

  const harborData = JSON.parse(decryptPassword(data.harborData, encryptKey))

  const [, protocol, harborUrl] = harborData.url.match(
    /^(https?:\/\/)?([\s\S]+)/
  )

  if (!harborUrl || pathRule.test(harborUrl)) {
    ctx.throw(400, 'Invalid harbor url')
    return
  }

  if (requestUrl === 'search') {
    path = `${protocol}${harborUrl}/api/v2.0/search`
  } else if (requestUrl === 'artifacts') {
    // the rule of harbor project name and repository name
    const projectRegex = /^[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,60}[a-zA-Z0-9])?$/
    const repositoryRegex = /^[a-zA-Z0-9](?:[-a-zA-Z0-9_/]{0,251}[a-zA-Z0-9])?$/

    if (harborData.projectName && harborData.repositoryName) {
      // get projectName and repositoryName by rule
      const [projectName] = harborData.projectName.match(projectRegex)
      const [repositoryName] = harborData.repositoryName.match(repositoryRegex)

      if (projectName && repositoryName) {
        const encodeRepositoryName = repositoryName.replace(/\//g, '%252F')
        path = `${protocol}${harborUrl}/api/v2.0/projects/${projectName}/repositories/${encodeRepositoryName}/artifacts`
      } else {
        ctx.throw(400, 'Invalid post data')
      }
    } else {
      ctx.throw(400, 'Invalid post data')
    }
  } else {
    ctx.throw(400, 'Invalid request url')
  }

  const params = data.params
  const url = `${path}?${qs.stringify(params)}`

  try {
    const res = await send_harbor_request({
      params: {
        isSkipTLS: harborData.isSkipTLS,
        auth: harborData.auth,
        protocol,
      },
      path: url,
      headers: omit(headers, NEED_OMIT_HEADERS),
    })

    let isErrorRes = false

    if (requestUrl === 'search') {
      const { repository, project, chart } = res
      // Check whether the response is the requirements
      isErrorRes = !(
        Array.isArray(repository) &&
        Array.isArray(project) &&
        Array.isArray(chart)
      )
    } else {
      isErrorRes = !Array.isArray(res)
    }

    if (isErrorRes) {
      ctx.throw(400, 'bad request')
    } else {
      ctx.body = res
    }
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

module.exports = {
  handleSampleData,
  handleDockerhubProxy,
  handleHarborProxy,
}
