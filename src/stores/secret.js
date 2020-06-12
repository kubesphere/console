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
import { Notify } from 'components/Base'
import Base from './base'

const dataFomatter = data => {
  if (data && data.type === 'kubernetes.io/dockerconfigjson') {
    const { url, username, password, email } = data.data['.dockerconfigjson']
    data.data['.dockerconfigjson'] = JSON.stringify({
      auths: {
        [url]: {
          username,
          password,
          email,
          auth: btoa(`${username}:${password}`),
        },
      },
    })
  }

  if (data.data) {
    Object.keys(data.data).forEach(key => {
      data.data[key] = btoa(data.data[key])
    })
  }
}

export default class SecretStore extends Base {
  module = 'secrets'

  @action
  async create(data) {
    const namespace = get(data, 'metadata.namespace')

    if (!namespace) {
      return
    }

    this.isSubmitting = true

    if (data && data.type === 'kubernetes.io/dockerconfigjson') {
      await this.validateImageRegistrySecret(data)
    }

    data && dataFomatter(data)

    return this.submitting(request.post(this.getListUrl({ namespace }), data))
  }

  @action
  update(detail, data) {
    return this.submitting(request.put(this.getDetailUrl(detail), data))
  }

  @action
  updateWithEncode(detail, data) {
    data && dataFomatter(data)
    return this.submitting(request.put(this.getDetailUrl(detail), data))
  }

  @action
  async validateImageRegistrySecret(data) {
    const { url, username, password } = data.data['.dockerconfigjson']

    const params = { username, password, serverhost: url }

    const resp = await request.post(
      `kapis/resources.kubesphere.io/v1alpha2/registry/verify`,
      params,
      {},
      (_, err) => {
        const msg = get(err, 'message', '')
        if (msg) {
          Notify.error({
            title: t('Registry verify failed'),
            content: t(msg),
          })
        }

        this.isSubmitting = false
        return Promise.reject(err)
      }
    )
    if (resp && resp.message === 'Verified') {
      return Promise.resolve(resp)
    }
  }
}
