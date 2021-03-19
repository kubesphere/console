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
import { set, cloneDeep } from 'lodash'

const deleteUnenableAttrs = data => {
  /* eslint-disable no-unused-vars */
  for (const key in data) {
    if (key.startsWith('enable_') && data[key] === false) {
      delete data[key.slice(7)]
      data.git_source && delete data.git_source[key.slice(7)]
      data.github_source && delete data.github_source[key.slice(7)]
      data.bitbucket_server_source &&
        delete data.bitbucket_server_source[key.slice(7)]
      data.svn_source && delete data.svn_source[key.slice(7)]
    }
  }
}

export const updatePipelineParams = (data, isEditor = false) => {
  const { multi_branch_pipeline, pipeline, type, ...rest } = data

  if (isEditor && !rest.description) {
    rest.description = ''
  }

  const param = cloneDeep(rest)

  if (param.metadata) {
    delete param.metadata
  }

  if (multi_branch_pipeline) {
    !isEditor
      ? rest
        ? Object.assign(data.multi_branch_pipeline, rest)
        : null
      : Object.assign(data.multi_branch_pipeline, param)

    data.type = 'multi-branch-pipeline'
    deleteUnenableAttrs(data.multi_branch_pipeline)
  }

  if (pipeline) {
    !isEditor
      ? Object.assign(data.pipeline, rest)
      : Object.assign(data.pipeline, param)

    data.type = 'pipeline'
    deleteUnenableAttrs(data.pipeline)
  }

  if (!isEditor) {
    for (const key in rest) {
      if (key !== 'devopsName') {
        delete data[key]
      }
    }
  }
}

export const updatePipelineParamsInSpec = (data, devops) => {
  if (data.multi_branch_pipeline) {
    data = set(data, 'metadata.name', data.multi_branch_pipeline.name)
    delete data.multi_branch_pipeline.metadata

    data.spec = {
      multi_branch_pipeline: { ...data.multi_branch_pipeline },
      type: data.type,
    }

    delete data.multi_branch_pipeline
  }

  if (data.pipeline) {
    data = set(data, 'metadata.name', data.pipeline.name)
    delete data.pipeline.metadata

    data.spec = {
      pipeline: { ...data.pipeline },
      type: data.type,
    }

    delete data.pipeline
  }

  delete data.type
  delete data.description

  data = set(data, 'metadata.namespace', devops)
}

export const groovyToJS = str => {
  const groovyReg = /([\w-]*) ?: '?([\w-:/_.]*)'?/g
  const result = {}
  let arr
  // eslint-disable-next-line no-cond-assign
  while ((arr = groovyReg.exec(str)) !== null) {
    if (arr[1]) {
      result[arr[1]] = arr[2]
    }
  }

  return result
}

export const getLanguageIcon = (name, defaultIcon) => {
  const LEGO_LANGUAGE_ICON = [
    'java',
    'gradle',
    'javascript',
    'php',
    'python',
    'golang',
    'nodejs',
    'jar',
    'war',
    'binary',
  ]
  return LEGO_LANGUAGE_ICON.includes(name) ? name : defaultIcon
}
