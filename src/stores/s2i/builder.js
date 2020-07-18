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

import { get, set, unset, uniq } from 'lodash'
import { action, observable } from 'mobx'
import Base from 'stores/base'
import { generateId } from 'utils'
import TEMPLATE from 'utils/form.templates'
import { S2I_SUPPORTED_TYPES, B2I_SUPPORTED_TYPES } from 'utils/constants'

import S2IRunStore from './run'

export default class S2IBuilderStore extends Base {
  get apiVersion() {
    return 'apis/devops.kubesphere.io/v1alpha1'
  }

  module = 's2ibuilders'

  runStore = new S2IRunStore()

  @observable detail = {}

  getS2iSupportLanguage = async params => {
    const result = await this.getBuilderTemplate(params)
    const supportS2iLanguage = {
      s2i: [...S2I_SUPPORTED_TYPES],
      b2i: [...B2I_SUPPORTED_TYPES],
    }
    const b2iMap = {
      java: 'jar',
      tomcat: 'war',
    }
    if (result && result.items) {
      result.items.forEach(template => {
        if (
          get(template, 'metadata.labels["builder-type.kubesphere.io/b2i"]')
        ) {
          supportS2iLanguage.b2i.push(
            b2iMap[template.spec.codeFramework] || template.spec.codeFramework
          )
        }
        if (
          get(template, 'metadata.labels["builder-type.kubesphere.io/s2i"]')
        ) {
          supportS2iLanguage.s2i.push(template.spec.codeFramework)
        }
      })
    }
    supportS2iLanguage.s2i = uniq(supportS2iLanguage.s2i)
    supportS2iLanguage.b2i = uniq(supportS2iLanguage.b2i)
    return supportS2iLanguage
  }

  getBuilderTemplate = async params =>
    await request.get(
      `apis/devops.kubesphere.io/v1alpha1${this.getPath(
        params
      )}/s2ibuildertemplates`
    )

  @action
  fetchDetail = async ({ cluster, namespace, name }) => {
    this.isLoading = true
    const result = await request.get(
      `apis/devops.kubesphere.io/v1alpha1${this.getPath({
        cluster,
        namespace,
      })}/s2ibuilders/${name}`,
      undefined,
      undefined,
      error => {
        if (error.reason === 'NotFound') {
          return error
        }
        Promise.reject(error)
      }
    )
    this.detail = this.mapper(result)
    this.detail.cluster = cluster
    this.isLoading = false
    return this.detail
  }

  updateCreateData(data, isEditor = false) {
    if (!isEditor) {
      const _name = `${get(data, 'spec.config.imageName', '').replace(
        /[_/:]/g,
        '-'
      )}-${get(data, 'spec.config.tag')}`
      data.metadata.name = `${_name.slice(0, 60)}-${generateId(3)}`
    }

    let repoUrl = get(data, 'metadata.annotations["kubesphere.io/repoUrl"]', '')
    repoUrl = repoUrl.replace(/^(http(s)?:\/\/)?(.*)$/, '$3')

    const imageName = get(data, 'spec.config.imageName', '')

    if (repoUrl && !imageName.startsWith(repoUrl)) {
      const totalImageName = repoUrl.endsWith('/')
        ? `${repoUrl}${imageName}`
        : `${repoUrl}/${imageName}`
      set(data, 'spec.config.imageName', totalImageName)
    }

    if (data.isUpdateWorkload === false) {
      set(
        data,
        'metadata.annotations["devops.kubesphere.io/donotautoscale"]',
        'true'
      )
    } else {
      unset(data, 'metadata.annotations["devops.kubesphere.io/donotautoscale"]')
    }

    delete data.isUpdateWorkload
  }

  creatBinary(name, namespace, cluster) {
    const data = TEMPLATE['b2iBuilders']({ name, namespace })
    return request.post(
      `apis/devops.kubesphere.io/v1alpha1/${this.getPath({
        namespace,
        cluster,
      })}/s2ibinaries/${name}`,
      data
    )
  }

  create(data, { cluster, namespace }) {
    this.updateCreateData(data, false)
    return request
      .post(this.getListUrl({ cluster, namespace }), data)
      .then(() => {
        const binaryUrl = get(data, 'metadata.annotations.sourceUrl')
        this.createS2IRun({
          cluster,
          namespace,
          builderName: get(data, 'metadata.name'),
          binaryUrl,
        })
      })
  }

  updateBuilder(data, { cluster, namespace, name }) {
    this.updateCreateData(data, true)
    return request
      .patch(this.getDetailUrl({ cluster, namespace, name }), data)
      .then(() => {
        const binaryUrl = get(data, 'metadata.annotations.sourceUrl')
        this.createS2IRun({
          cluster,
          namespace,
          builderName: get(data, 'metadata.name'),
          binaryUrl,
        })
      })
  }

  createS2IRun({ cluster, namespace, builderName, binaryUrl }) {
    if (!builderName || !namespace) {
      return
    }

    const name = `${builderName.slice(0, 37)}-${generateId(3)}`
    const data = {
      apiVersion: 'devops.kubesphere.io/v1alpha1',
      kind: 'S2iRun',
      metadata: {
        name,
        cluster,
        namespace,
      },
      spec: {
        builderName,
        binaryUrl,
        ...(binaryUrl ? { isBinaryURL: true } : {}),
      },
    }
    return this.runStore.create(data, { cluster, namespace })
  }

  @action
  rerun = async ({
    name,
    cluster,
    namespace,
    isUpdateWorkload = true,
    ...rest
  }) => {
    const annotations = isUpdateWorkload
      ? {}
      : {
          'devops.kubesphere.io/donotautoscale': 'true',
        }
    return this.runStore.create({
      apiVersion: 'devops.kubesphere.io/v1alpha1',
      kind: 'S2iRun',
      metadata: {
        annotations,
        name: `${name}-rerun-${generateId(3)}`,
        namespace,
      },
      spec: {
        builderName: name,
        ...rest,
      },
    })
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
