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

import { get } from 'lodash'
import { action } from 'mobx'
import BaseStore from 'stores/base'
import ObjectMapper from 'utils/object.mapper'
import request from 'utils/request'
import ImageBuildStrategiesStore from './imageBuildStrategies'

export default class ImgBuilderStore extends BaseStore {
  constructor() {
    super()
    this.module = 'imagebuilds'
    this.stategies = new ImageBuildStrategiesStore()
  }

  get apiVersion() {
    return 'kapis/builder.kubesphere.io/v1alpha1'
  }

  getResourceUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/${this.module}`

  getFormTemplate = ({ namespace, languageType = '' }) => ({
    apiVersion: 'shipwright.io/v1alpha1',
    kind: 'Build',
    metadata: {
      labels: {},
      annotations: {
        languageType,
      },
      name: '',
      namespace,
    },
    spec: {
      strategy: {
        kind: 'ClusterBuildStrategy',
      },
    },
  })

  get mapper() {
    return item => {
      return {
        ...ObjectMapper.default(item),
        type: get(item, 'metadata.annotations.languageType'),
        status: get(item, 'status.reason'),
      }
    }
  }

  getS2iSupportLanguage = () => {
    return { s2i: ['java', 'nodejs', 'python', 'go'] }
  }

  getBuilderTemplate = async params =>
    await this.stategies.fetchListByK8s(params)

  @action
  async create(data, params = {}) {
    const res = await this.submitting(
      request.post(this.getListUrl(params), data)
    )
    if (this.afterChange) {
      this.afterChange(res)
    }
    return res
  }

  @action
  run = params => {
    return this.submitting(
      request.post(`${this.getDetailUrl(params)}/imagebuildRuns`)
    )
  }

  async verifyRepoReadable(url, secret, namespace) {
    if (!url) return
    const params = secret
      ? {
          remoteUrl: url,
          secretRef: {
            name: secret,
            namespace,
          },
        }
      : { remoteUrl: url }
    return await request.post(
      `kapis/resources.kubesphere.io/v1alpha2/git/verify`,
      params,
      {},
      err => {
        const message = get(err, 'message', '')
        if (message) {
          return Promise.resolve({ message })
        }
        return Promise.reject(err)
      }
    )
  }
}
