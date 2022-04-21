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

import { action } from 'mobx'
import Base from './base'

export default class VolumeSnapshotClassStore extends Base {
  module = 'volumesnapshotclasses'

  get resourceKind() {
    return 'VolumeSnapshotClass'
  }

  get apiVersion() {
    return 'apis/snapshot.storage.k8s.io/v1beta1'
  }

  create(params, options) {
    return super.create(
      {
        apiVersion: 'snapshot.storage.k8s.io/v1beta1',
        kind: this.resourceKind,
        deletionPolicy: 'Delete',
        ...params,
      },
      options
    )
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(
      this.getDetailUrl(params),
      {},
      {},
      () => {}
    )
    const detail = result ? { ...params, ...this.mapper(result) } : {}

    this.detail = detail
    this.isLoading = false
    return detail
  }

  async deleteSilent(params) {
    await request.delete(this.getDetailUrl(params), {}, {}, () => {})
  }

  async silentBatchDelete(keys) {
    return Promise.all(
      keys.map(name =>
        request.delete(this.getDetailUrl({ name }), {}, {}, () => {})
      )
    )
  }
}
