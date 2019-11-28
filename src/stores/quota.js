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

import { action, observable } from 'mobx'

export default class QuotaStore {
  @observable
  isLoading = false

  @observable
  isSubmitting = false

  @observable
  data = {}

  @observable
  detail = {}

  @observable
  status = {}

  @action
  submitting = promise => {
    this.isSubmitting = true

    setTimeout(() => {
      promise
        .catch(() => {})
        .finally(() => {
          this.isSubmitting = false
        })
    }, 500)

    return promise
  }

  @action
  async fetch({ namespace }) {
    this.isLoading = true

    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2/namespaces/${namespace}/quotas`
    )

    this.data = result.data

    this.isLoading = false
  }

  @action
  async fetchDetail({ name, namespace }) {
    this.isLoading = true

    const result = await request.get(
      `api/v1/namespaces/${namespace}/resourcequotas/${name}`,
      null,
      null,
      () => {}
    )

    this.detail = result || {}

    this.isLoading = false
  }

  @action
  patch({ name, namespace }, data) {
    return this.submitting(
      request.patch(
        `api/v1/namespaces/${namespace}/resourcequotas/${name}`,
        data
      )
    )
  }

  @action
  update({ name, namespace }, data) {
    return this.submitting(
      request.put(`api/v1/namespaces/${namespace}/resourcequotas/${name}`, data)
    )
  }

  @action
  create(data) {
    return this.submitting(
      request.post(
        `api/v1/namespaces/${data.metadata.namespace}/resourcequotas`,
        data
      )
    )
  }

  @action
  async checkName(params) {
    return await request.get(
      `api/v1/namespaces/${params.namespace}/resourcequotas/${params.name}`,
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }
}
