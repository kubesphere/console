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

import { observable } from 'mobx'
import { to } from 'utils'
import VolumeSnapshotStore from 'stores/volumeSnapshot'

import Base from './base'

export default class VolumeStore extends Base {
  get resourceKind() {
    return 'PersistentVolumeClaim'
  }

  @observable
  mountedPods = {
    data: [],
    isLoading: true,
  }

  module = 'persistentvolumeclaims'

  snapshotType = []

  async getSnapshotType() {
    this.snapshotType = await request.get(
      `/apis/snapshot.storage.k8s.io/v1beta1/volumesnapshotclasses`
    )
  }

  async fetchVolumeMountStatus() {
    const { name, namespace } = this.detail

    const result = await to(
      request.get(this.getResourceUrl({ namespace }), {
        name,
      })
    )

    const volumes = result.items || []

    const volume = volumes.find(vol => this.mapper(vol).name === name) || {}

    this.detail.inUse = this.mapper(volume).inUse
  }

  async cloneVolume({ name }) {
    const {
      cluster,
      namespace,
      name: sourceName,
      accessModes,
      capacity,
      storageClassName,
    } = this.detail

    const params = {
      apiVersion: 'v1',
      kind: this.resourceKind,
      metadata: {
        name,
      },
      spec: {
        accessModes,
        resources: {
          requests: {
            storage: capacity,
          },
        },
        dataSource: {
          kind: this.resourceKind,
          name: sourceName,
        },
        storageClassName,
      },
    }

    const path = this.getListUrl({ cluster, namespace })

    await this.submitting(request.post(path, params))
  }

  /**
   * create snapshot from detail
   */
  async createSnapshot({ name, type }) {
    const snapshotstore = new VolumeSnapshotStore()
    const { cluster, namespace, name: sourceName } = this.detail

    const path = snapshotstore.getListUrl({ cluster, namespace })

    const params = {
      apiVersion: 'snapshot.storage.k8s.io/v1beta1',
      kind: snapshotstore.resourceKind,
      metadata: {
        name,
      },
      spec: {
        volumeSnapshotClassName: type,
        source: {
          kind: this.resourceKind,
          persistentVolumeClaimName: sourceName,
        },
      },
    }

    await this.submitting(request.post(path, params))
  }
}
